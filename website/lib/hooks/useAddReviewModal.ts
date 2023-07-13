import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from "react";
import {
  IInterviewResourceDisplay,
  getInterviewResourceValidator,
} from "src/components/InterviewResources/InterviewResources";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IInterviewReview } from "src/database/models/InterviewReview";
import { IJobReview } from "src/database/models/JobReview";
import { IJobRole } from "src/database/models/JobRole";
import { Requests } from "src/lib/requests/Requests";
import { Page } from "src/lib/types/page";
import { generateSchoolTerms } from "../dates/dates";

export enum AddReviewModalState {
  HOME,
  HOME_SUBMIT_DOMAIN,
  HOME_ERROR,
  REVIEW_JOB_1,
  REVIEW_JOB_2,
  REVIEW_JOB_UPDATE,
  REVIEW_JOB_ERROR,
  REVIEW_JOB_LOADING,
  REVIEW_JOB_DELETE,
  INTERVIEW,
  INTERVIEW_ERROR,
  INTERVIEW_LOADING,
  INTERVIEW_DELETE,
}

export enum InterviewStatus {
  R1_ACCEPTED = "Accepted_offer",
  R1_REJECTED = "Rejected_offer",
  RM = "Ranked_and_matched",
  R = "Ranked",
  U = "Unranked_/_No offer",
  COMPLETE = "Completed_Interview",
}

export enum InterviewResourceType {
  LEETCODE = "Leetcode",
}

export interface IInterviewResource {
  resourceType: InterviewResourceType;
  value: string;
}

const MAX_REVIEW_LENGTH = 320;
export const CANNOT_FIND_COMPANY_STRING = `I can't find my company`;

export const useAddReviewModal = (
  closeModal: () => void,
  onSuccess?: () => void,
  companyData?: ICompanyClearbitData,
  reviewProp?: IJobReview,
  origin?: Page,
  interviewProp?: IInterviewReview
) => {
  const [state, setState] = useState<AddReviewModalState>(
    reviewProp
      ? AddReviewModalState.REVIEW_JOB_UPDATE
      : interviewProp
      ? AddReviewModalState.INTERVIEW
      : AddReviewModalState.HOME
  );
  const [company, setCompany] = useState<ICompanyClearbitData | undefined>(
    companyData
  );
  const [role, setRole] = useState<IJobRole | undefined>(
    reviewProp?.role ?? interviewProp?.role ?? undefined
  );
  const [stars, setStars] = useState<number>(
    (interviewProp?.difficulty ?? 60) / 20
  );
  const [mentorshipStars, setMentorshipStars] = useState<number>(
    (reviewProp?.mentorshipRating ?? interviewProp?.difficulty ?? 60) / 20
  );
  const [workLifeStars, setWorkLifeStars] = useState<number>(
    (reviewProp?.workLifeRating ?? interviewProp?.difficulty ?? 60) / 20
  );
  const [meaningfulStars, setMeaninfgulStars] = useState<number>(
    (reviewProp?.meaningfulRating ?? interviewProp?.difficulty ?? 60) / 20
  );
  const [salary, setSalary] = useState<number>(reviewProp?.salary ?? 14);
  const [review, setReview] = useState<string>(
    reviewProp?.review ?? interviewProp?.review ?? ""
  );
  const [coopNumber, setCoopNumber] = useState<number>(
    reviewProp?.coopNumber ?? 1
  );

  const [jobTerm, setJobTerm] = useState<string>(
    reviewProp?.jobTerm ?? generateSchoolTerms(1)[0]
  );

  const [location, setLocation] = useState<string>(reviewProp?.location ?? "");
  const [reviewJobServerError, setReviewJobServerError] = useState<string>();
  const [interviewResources, setInterviewResourcesState] = useState<
    IInterviewResourceDisplay[]
  >(
    interviewProp?.resources.map(x => ({ ...x, isEditMode: false })) ?? [
      {
        resourceType: InterviewResourceType.LEETCODE,
        value: "",
        isEditMode: true,
      },
    ]
  );
  const router = useRouter();

  const [isAnonymous, setIsAnonymous] = useState<boolean>(
    reviewProp?.anonymous ?? interviewProp?.anonymous ?? false
  );
  const [interviewStatus, setInterviewStatus] = useState<InterviewStatus>(
    interviewProp?.status ?? InterviewStatus.R
  );

  const companyError = !company && state === AddReviewModalState.HOME_ERROR;
  const roleError = !role && state === AddReviewModalState.HOME_ERROR;

  const onClickJobReview = () => {
    if (!company || !role) {
      setState(AddReviewModalState.HOME_ERROR);
      return;
    }
    setState(AddReviewModalState.REVIEW_JOB_1);
  };

  const onClickInterviewReview = () => {
    if (!company || !role) {
      setState(AddReviewModalState.HOME_ERROR);
      return;
    }
    setState(AddReviewModalState.INTERVIEW);
  };

  const onChangeCompany = (data?: ICompanyClearbitData) => {
    if (data?.id === "0" && data?.companyName === CANNOT_FIND_COMPANY_STRING) {
      setState(AddReviewModalState.HOME_SUBMIT_DOMAIN);
      return;
    }
    setCompany(data);
  };

  const onChangeRole = (data?: IJobRole) => {
    setRole(data);
  };

  useEffect(() => {
    setCompany(companyData);
  }, [companyData]);

  const homeErrorMessage: string | undefined = useMemo(() => {
    if (state !== AddReviewModalState.HOME_ERROR) {
      return;
    }
    if (companyError && roleError) {
      return "Select a Company and Role";
    } else if (companyError) {
      return "Please select a Company";
    } else if (roleError) {
      return "Please select a Role";
    }

    return;
  }, [companyError, roleError, state]);
  const isUpdateReview = !!reviewProp;
  const isUpdateInterview = !!interviewProp;
  const modalTitle: string = useMemo(() => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB_1:
      case AddReviewModalState.REVIEW_JOB_2:
      case AddReviewModalState.REVIEW_JOB_UPDATE:
      case AddReviewModalState.REVIEW_JOB_ERROR:
      case AddReviewModalState.REVIEW_JOB_LOADING:
      case AddReviewModalState.REVIEW_JOB_DELETE:
        return isUpdateReview ? "Update Job Review" : `Job Review`;
      case AddReviewModalState.INTERVIEW:
      case AddReviewModalState.INTERVIEW_ERROR:
      case AddReviewModalState.INTERVIEW_DELETE:
      case AddReviewModalState.INTERVIEW_LOADING:
        return "Interview Review";
      case AddReviewModalState.HOME_SUBMIT_DOMAIN:
        return "Submit Company Domain";
      default:
        return "Add Your Review";
    }
  }, [state, isUpdateReview]);

  const companyAndRole = `${company?.companyName}, ${role?.role}`;

  const onBack = () => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB_2:
        setState(AddReviewModalState.REVIEW_JOB_1);
        return;
      case AddReviewModalState.HOME_SUBMIT_DOMAIN:
        setCompany(undefined);
        setState(AddReviewModalState.HOME);
        return;
      default:
        setState(AddReviewModalState.HOME);
        return;
    }
  };

  const onNext = () => {
    setState(AddReviewModalState.REVIEW_JOB_2);
  };

  const isBackToHomeDisabled = !!isUpdateReview;

  const onSubmitJobReview = async () => {
    if (!salary || isReviewLengthError || !role || !company) {
      setState(AddReviewModalState.REVIEW_JOB_ERROR);
      return;
    }
    setState(AddReviewModalState.REVIEW_JOB_LOADING);
    try {
      if (isUpdateReview) {
        await Requests.patchJobReview(reviewProp.id, {
          role,
          company,
          mentorshipRating: mentorshipStars,
          workLifeRating: workLifeStars,
          meaningfulRating: meaningfulStars,
          verified: false,
          anonymous: isAnonymous,
          salary,
          review,
          coopNumber,
          location,
          jobTerm,
        });
      } else {
        await Requests.postJobReview({
          role,
          company,
          mentorshipRating: mentorshipStars,
          workLifeRating: workLifeStars,
          meaningfulRating: meaningfulStars,
          verified: false,
          anonymous: isAnonymous,
          salary,
          review,
          coopNumber,
          location,
          jobTerm,
        });
      }
      setState(
        isUpdateReview
          ? AddReviewModalState.REVIEW_JOB_UPDATE
          : AddReviewModalState.HOME
      );
      onSuccess?.();
      if (origin !== Page.JOB_PAGE) {
        if (origin === Page.ANY) {
          router.push("/user?tab=1");
        }
      }
      closeModal();
    } catch (e: any) {
      setState(AddReviewModalState.REVIEW_JOB_ERROR);
      setReviewJobServerError(e.response.data);
    }
  };

  const onDeleteReview = async () => {
    if (!company || !reviewProp) {
      return;
    }
    try {
      await Requests.deleteJobReview(reviewProp.id);
      setState(
        isUpdateReview
          ? AddReviewModalState.REVIEW_JOB_UPDATE
          : AddReviewModalState.HOME
      );
      onSuccess?.();
      if (origin === Page.ANY) {
        router.push("/user?tab=1");
      }
      closeModal();
    } catch (e: any) {
      setState(AddReviewModalState.REVIEW_JOB_ERROR);
      setReviewJobServerError(e.response.data);
    }
  };

  const onDeleteInterview = async () => {
    if (!company || !interviewProp) {
      return;
    }
    try {
      await Requests.deleteInterviewReview(interviewProp.id);
      setState(
        isUpdateInterview
          ? AddReviewModalState.INTERVIEW
          : AddReviewModalState.HOME
      );
      onSuccess?.();
      if (origin === Page.ANY) {
        router.push("/user?tab=1");
      }
      closeModal();
    } catch (e: any) {
      setState(AddReviewModalState.INTERVIEW_ERROR);
      setReviewJobServerError(e.response.data);
    }
  };

  const onSubmitInterviewReview = async () => {
    if (isReviewLengthError || !role || !company) {
      setState(AddReviewModalState.INTERVIEW_ERROR);
      return;
    }
    setState(AddReviewModalState.INTERVIEW_LOADING);
    try {
      if (isUpdateInterview) {
        await Requests.patchInterviewReview(interviewProp.id, {
          role,
          company,
          difficulty: stars,
          verified: false,
          anonymous: isAnonymous,
          status: interviewStatus,
          review,
          resources: interviewResources,
        });
      } else {
        await Requests.postInterviewReview({
          role,
          company,
          difficulty: stars,
          verified: false,
          anonymous: isAnonymous,
          status: interviewStatus,
          review,
          resources: interviewResources,
        });
      }
      setState(
        isUpdateInterview
          ? AddReviewModalState.INTERVIEW
          : AddReviewModalState.HOME
      );
      onSuccess?.();
      if (origin !== Page.JOB_PAGE) {
        if (origin === Page.ANY) {
          router.push("/user?tab=1");
        }
      }
      closeModal();
    } catch (e: any) {
      setState(AddReviewModalState.INTERVIEW_ERROR);
      setReviewJobServerError(e.response.data);
    }
  };

  const salaryError =
    state === AddReviewModalState.REVIEW_JOB_ERROR && salary === 0;
  const isReviewLengthError = review.length > MAX_REVIEW_LENGTH;
  const reviewError =
    (state === AddReviewModalState.REVIEW_JOB_ERROR ||
      state === AddReviewModalState.INTERVIEW_ERROR) &&
    isReviewLengthError;

  const jobReviewErrorString: string | undefined = useMemo(() => {
    if (
      state !== AddReviewModalState.REVIEW_JOB_ERROR &&
      state !== AddReviewModalState.INTERVIEW_ERROR
    ) {
      return undefined;
    }
    if (reviewJobServerError) {
      return reviewJobServerError;
    } else if (salaryError) {
      return "Salary must be greater than 0";
    } else if (reviewError) {
      return `Review must be less than ${MAX_REVIEW_LENGTH} characters`;
    }
    return;
  }, [salaryError, reviewError, reviewJobServerError, state]);
  const reviewCharacterCountText = `${review.length} / ${MAX_REVIEW_LENGTH}`;

  const submitText =
    isUpdateReview || isUpdateInterview ? "Update Review" : "Submit Review";

  const toggleDeleteMode = () => {
    if (isUpdateReview) {
      if (
        state === AddReviewModalState.REVIEW_JOB_UPDATE ||
        state === AddReviewModalState.REVIEW_JOB_ERROR
      ) {
        setState(AddReviewModalState.REVIEW_JOB_DELETE);
      } else {
        setState(AddReviewModalState.REVIEW_JOB_UPDATE);
      }
    }

    if (isUpdateInterview) {
      if (
        state === AddReviewModalState.INTERVIEW ||
        state === AddReviewModalState.INTERVIEW_ERROR
      ) {
        setState(AddReviewModalState.INTERVIEW_DELETE);
      } else {
        setState(AddReviewModalState.INTERVIEW);
      }
    }
  };

  const setInterviewResources = (data: IInterviewResourceDisplay[]) => {
    setInterviewResourcesState(data);
  };

  const nValidResources: number = useMemo(() => {
    return interviewResources.filter(x => {
      return getInterviewResourceValidator(x.resourceType)(x.value);
    }).length;
  }, [interviewResources]);

  const progress: string | undefined = useMemo(() => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB_1:
        return "2/3";
      case AddReviewModalState.REVIEW_JOB_2:
        return "3/3";
      default:
        return undefined;
    }
  }, [state]);

  const showNextButton: boolean = useMemo(() => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB_1:
      case AddReviewModalState.REVIEW_JOB_2:
        return true;
      default:
        return false;
    }
  }, [state]);

  const disableNextButton: boolean = useMemo(() => {
    if (!showNextButton) {
      return true;
    }
    if (state === AddReviewModalState.REVIEW_JOB_2) {
      return true;
    }

    if (salary < 0 || !location) {
      return true;
    }

    return false;
  }, [state, showNextButton, salary, location]);

  const onSubmitCompanySuccess = (company: ICompanyClearbitData) => {
    setCompany(company);
    setState(AddReviewModalState.HOME);
  };

  return {
    companyError,
    roleError,
    state,
    onClickJobReview,
    onClickInterviewReview,
    onChangeRole,
    onChangeCompany,
    homeErrorMessage,
    modalTitle,
    role,
    companyAndRole,
    onBack,
    onNext,
    jobReviewErrorString,
    reviewCharacterCountText,
    onSubmitJobReview,
    stars,
    setStars,
    meaningfulStars,
    setMeaninfgulStars,
    workLifeStars,
    setWorkLifeStars,
    mentorshipStars,
    setMentorshipStars,
    salary,
    setSalary,
    salaryError,
    review,
    setReview,
    reviewError,
    isReviewLengthError,
    isAnonymous,
    setIsAnonymous,
    interviewStatus,
    setInterviewStatus,
    onSubmitInterviewReview,
    isBackToHomeDisabled,
    submitText,
    toggleDeleteMode,
    onDeleteReview,
    isUpdateReview,
    isUpdateInterview,
    onDeleteInterview,
    interviewResources,
    setInterviewResources,
    nValidResources,
    coopNumber,
    setCoopNumber,
    progress,
    showNextButton,
    disableNextButton,
    location,
    setLocation,
    onSubmitCompanySuccess,
    companyState: company,
    jobTerm,
    setJobTerm,
  };
};
