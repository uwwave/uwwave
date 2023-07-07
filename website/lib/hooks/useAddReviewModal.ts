import { useRouter } from "next/router";
import { useState, useMemo } from "react";
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

export enum AddReviewModalState {
  HOME,
  HOME_ERROR,
  REVIEW_JOB,
  REVIEW_JOB_ERROR,
  REVIEW_JOB_LOADING,
  REVIEW_JOB_DELETE,
  INTERVIEW,
  INTERVIEW_ERROR,
  INTERVIEW_LOADING,
  INTERVIEW_DELETE,
}

export enum InterviewStatus {
  R1_ACCEPTED = "Ranked_1,_Accepted_offer",
  R1_REJECTED = "Ranked_1,_Rejected_offer",
  RM = "Ranked_and_matched",
  R = "Ranked",
  U = "Unranked",
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
      ? AddReviewModalState.REVIEW_JOB
      : interviewProp
      ? AddReviewModalState.INTERVIEW
      : AddReviewModalState.HOME
  );
  const [company, setCompany] = useState<ICompanyClearbitData | undefined>(
    companyData
  );
  const [role, setRole] = useState<IJobRole | undefined>(
    reviewProp?.role ?? interviewProp?.role
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
    setState(AddReviewModalState.REVIEW_JOB);
  };

  const onClickInterviewReview = () => {
    if (!company || !role) {
      setState(AddReviewModalState.HOME_ERROR);
      return;
    }
    setState(AddReviewModalState.INTERVIEW);
  };

  const onChangeCompany = (data?: ICompanyClearbitData) => {
    setCompany(data);
  };

  const onChangeRole = (data?: IJobRole) => {
    setRole(data);
  };

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
      case AddReviewModalState.REVIEW_JOB:
      case AddReviewModalState.REVIEW_JOB_ERROR:
      case AddReviewModalState.REVIEW_JOB_LOADING:
      case AddReviewModalState.REVIEW_JOB_DELETE:
        return isUpdateReview ? "Update Job Review" : `Job Review`;
      case AddReviewModalState.INTERVIEW:
      case AddReviewModalState.INTERVIEW_ERROR:
      case AddReviewModalState.INTERVIEW_DELETE:
      case AddReviewModalState.INTERVIEW_LOADING:
        return "Interview Review";
      default:
        return "Add Your Review";
    }
  }, [state, isUpdateReview]);

  const companyAndRole = `${company?.companyName}, ${role?.role}`;

  const onBackToHome = () => {
    setState(AddReviewModalState.HOME);
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
        });
      }
      setState(
        isUpdateReview
          ? AddReviewModalState.REVIEW_JOB
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
          ? AddReviewModalState.REVIEW_JOB
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
        state === AddReviewModalState.REVIEW_JOB ||
        state === AddReviewModalState.REVIEW_JOB_ERROR
      ) {
        setState(AddReviewModalState.REVIEW_JOB_DELETE);
      } else {
        setState(AddReviewModalState.REVIEW_JOB);
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
    onBackToHome,
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
  };
};
