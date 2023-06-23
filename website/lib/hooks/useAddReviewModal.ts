import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
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
}

export enum InterviewStatus {
  R1_ACCEPTED = "Ranked_1,_Accepted_offer",
  R1_REJECTED = "Ranked_1,_Rejected_offer",
  RM = "Ranked_and_matched",
  R = "Ranked",
  U = "Unranked",
  COMPLETE = "Completed_Interview",
}

const MAX_REVIEW_LENGTH = 320;

export const useAddReviewModal = (
  onClose: () => void,
  companyData?: ICompanyClearbitData,
  reviewProp?: IJobReview,
  origin?: Page
) => {
  const [state, setState] = useState<AddReviewModalState>(
    reviewProp ? AddReviewModalState.REVIEW_JOB : AddReviewModalState.HOME
  );
  const [company, setCompany] = useState<ICompanyClearbitData | undefined>(
    companyData
  );
  const [role, setRole] = useState<IJobRole | undefined>(reviewProp?.role);
  const [stars, setStars] = useState<number>((reviewProp?.rating ?? 60) / 20);
  const [salary, setSalary] = useState<number>(reviewProp?.salary ?? 0);
  const [review, setReview] = useState<string>(reviewProp?.review ?? "");
  const [reviewJobServerError, setReviewJobServerError] = useState<string>();
  const router = useRouter();

  const [isAnonymous, setIsAnonymous] = useState<boolean>(
    reviewProp?.anonymous ?? false
  );
  const [interviewStatus, setInterviewStatus] = useState<InterviewStatus>(
    InterviewStatus.R
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
  const modalTitle: string = useMemo(() => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB:
      case AddReviewModalState.REVIEW_JOB_ERROR:
      case AddReviewModalState.REVIEW_JOB_LOADING:
      case AddReviewModalState.REVIEW_JOB_DELETE:
        return isUpdateReview ? "Update Job Review" : `Job Review`;
      case AddReviewModalState.INTERVIEW:
      case AddReviewModalState.INTERVIEW_ERROR:
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
          rating: stars,
          verified: false,
          anonymous: isAnonymous,
          salary,
          review,
        });
      } else {
        await Requests.postJobReview({
          role,
          company,
          rating: stars,
          verified: false,
          anonymous: isAnonymous,
          salary,
          review,
        });
      }
      setState(
        isUpdateReview
          ? AddReviewModalState.REVIEW_JOB
          : AddReviewModalState.HOME
      );
      onClose();
      if (origin !== Page.JOB_PAGE) {
        router.push(
          origin === Page.COMPANY_PAGE
            ? `/companies/${company.id}/?tab=3`
            : "/user?tab=1"
        );
      }
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
      onClose();
      router.push(
        origin === Page.COMPANY_PAGE
          ? `/companies/${company.id}/?tab=3`
          : "/user?tab=1"
      );
    } catch (e: any) {
      setState(AddReviewModalState.REVIEW_JOB_ERROR);
      setReviewJobServerError(e.response.data);
    }
  };

  const onSubmitInterviewReview = () => {
    if (isReviewLengthError) {
      setState(AddReviewModalState.INTERVIEW_ERROR);
      return;
    }
    setState(AddReviewModalState.INTERVIEW);
    console.log({
      stars,
      interviewStatus,
      review,
      isAnonymous,
    });
  };

  const salaryError =
    (state === AddReviewModalState.REVIEW_JOB_ERROR ||
      state === AddReviewModalState.INTERVIEW_ERROR) &&
    salary === 0;
  const isReviewLengthError = review.length > MAX_REVIEW_LENGTH;
  const reviewError =
    (state === AddReviewModalState.REVIEW_JOB_ERROR ||
      state === AddReviewModalState.INTERVIEW_ERROR) &&
    isReviewLengthError;

  const jobReviewErrorString: string | undefined = useMemo(() => {
    if (
      reviewJobServerError &&
      state === AddReviewModalState.REVIEW_JOB_ERROR
    ) {
      return reviewJobServerError;
    } else if (salaryError && state === AddReviewModalState.REVIEW_JOB_ERROR) {
      return "Salary must be greater than 0";
    } else if (reviewError) {
      return `Review must be less than ${MAX_REVIEW_LENGTH} characters`;
    }
    return;
  }, [salaryError, reviewError, reviewJobServerError, state]);
  const reviewCharacterCountText = `${review.length} / ${MAX_REVIEW_LENGTH}`;

  const submitText = isUpdateReview ? "Update Review" : "Submit Review";

  const toggleDeleteMode = () => {
    if (state === AddReviewModalState.REVIEW_JOB) {
      setState(AddReviewModalState.REVIEW_JOB_DELETE);
    } else {
      setState(AddReviewModalState.REVIEW_JOB);
    }
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
    onBackToHome,
    jobReviewErrorString,
    reviewCharacterCountText,
    onSubmitJobReview,
    stars,
    setStars,
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
  };
};
