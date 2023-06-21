import { useState, useMemo } from "react";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IJobRole } from "src/database/models/JobRole";

export enum AddReviewModalState {
  HOME,
  HOME_ERROR,
  REVIEW_JOB,
  REVIEW_JOB_ERROR,
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

export const useAddReviewModal = (companyData?: ICompanyClearbitData) => {
  const [state, setState] = useState<AddReviewModalState>(
    AddReviewModalState.HOME
  );
  const [company, setCompany] = useState<ICompanyClearbitData | undefined>(
    companyData
  );
  const [role, setRole] = useState<IJobRole>();
  const [stars, setStars] = useState<number>(3);
  const [salary, setSalary] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
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

  const modalTitle: string = useMemo(() => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB:
      case AddReviewModalState.REVIEW_JOB_ERROR:
        return `Job Review`;
      case AddReviewModalState.INTERVIEW:
      case AddReviewModalState.INTERVIEW_ERROR:
        return "Interview Review";
      default:
        return "Add Your Review";
    }
  }, [state]);

  const companyAndRole = `${company?.companyName}, ${role?.role}`;

  const onBackToHome = () => {
    setState(AddReviewModalState.HOME);
  };

  const onSubmitJobReview = () => {
    if (!salary || isReviewLengthError) {
      setState(AddReviewModalState.REVIEW_JOB_ERROR);
      return;
    }
    setState(AddReviewModalState.REVIEW_JOB);
    console.log({
      stars,
      salary,
      review,
      isAnonymous,
    });
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
    if (salaryError && state === AddReviewModalState.REVIEW_JOB_ERROR) {
      return "Salary must be greater than 0";
    } else if (reviewError) {
      return `Review must be less than ${MAX_REVIEW_LENGTH} characters`;
    }
    return;
  }, [salaryError, reviewError]);
  const reviewCharacterCountText = `${review.length} / ${MAX_REVIEW_LENGTH}`;

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
  };
};
