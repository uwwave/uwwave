import { BaseModal } from "src/components/Modals/BaseModal";
import React from "react";
import styled from "styled-components";
import { Color } from "src/styles/color";
import { Spacer } from "src/components/Spacer/Spacer";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  CompanyLogo,
  CompanySearchInput,
  StyledBusinessIcon,
} from "src/components/TextField/variants/CompanySearchInput";
import { JobRoleSearchInput } from "src/components/TextField/variants/JobRoleSearnInput";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { SingleValueSearch } from "src/components/TextField/variants/SingleValueSearch";
import {
  AddReviewModalState,
  InterviewStatus,
  useAddReviewModal,
} from "src/lib/hooks/useAddReviewModal";
import { StarsInput } from "src/components/StarsInput/StarsInput";
import { RoundedTextField } from "src/components/TextField/RoundedTextField";
import TextField from "@mui/material/TextField";
import { Checkbox } from "src/components/Checkbox/Checkbox";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { TertiaryButton } from "src/components/Buttons/TertiaryButton";
import ChevronLeftIcon from "@mui/icons-material/ArrowBackIos";
import { Select } from "src/components/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import { InterviewResources } from "src/components/InterviewResources/InterviewResources";

interface IAddReviewModal {
  isOpen: boolean;
  company?: ICompanyClearbitData;
  close: () => void;
}

export const AddReviewModal = ({ isOpen, close, company }: IAddReviewModal) => {
  const {
    companyError,
    roleError,
    state,
    onClickJobReview,
    onClickInterviewReview,
    onChangeRole,
    onChangeCompany,
    homeErrorMessage,
    modalTitle,
    companyAndRole,
    onBackToHome,
    jobReviewErrorString,
    onSubmitJobReview,
    stars,
    setStars,
    salary,
    setSalary,
    salaryError,
    review,
    setReview,
    reviewError,
    reviewCharacterCountText,
    isReviewLengthError,
    isAnonymous,
    setIsAnonymous,
    interviewStatus,
    setInterviewStatus,
    onSubmitInterviewReview,
  } = useAddReviewModal(company);
  const renderHome = () => (
    <>
      {
        // This is so that the input doesn't flash when we close the modal
        // We still want this to reset the displayed search input on close
        company ? (
          <SingleValueSearch
            value={company.companyName}
            icon={
              company.logo ? (
                <CompanyLogo logo={company.logo} />
              ) : (
                <StyledBusinessIcon />
              )
            }
          />
        ) : isOpen ? (
          <CompanySearchInput
            onValue={data => {
              onChangeCompany(data);
            }}
            error={companyError}
          />
        ) : (
          <CompanySearchInput />
        )
      }

      <Spacer height={4} />
      {
        // This is so that the input doesn't flash when we close the modal
        // We still want this to reset the displayed search input on close
        isOpen ? (
          <JobRoleSearchInput
            onValue={data => {
              onChangeRole(data);
            }}
            error={roleError}
          />
        ) : (
          <JobRoleSearchInput />
        )
      }
      {homeErrorMessage ? (
        <>
          <Spacer height={8} />
          <Typography color="red" align="center" variant="subtitle1">
            {homeErrorMessage}
          </Typography>
        </>
      ) : null}
      <Spacer height={8} />
      <Typography color="white" align="center" variant="subtitle1">
        Select a Review Type
      </Typography>
      <Spacer height={8} />
      <ReviewTypesWrapper>
        <ReviewTypeWrapper>
          <ReviewTypeButton bgcolor={Color.rating} onClick={onClickJobReview}>
            <ReviewIcon />
            <Typography color="white" variant="h5" align="center">
              Job
            </Typography>
          </ReviewTypeButton>
        </ReviewTypeWrapper>
        <ReviewTypeWrapper>
          <ReviewTypeButton
            bgcolor={Color.compatibility}
            onClick={onClickInterviewReview}
          >
            <InterviewIcon />
            <Typography color="white" variant="h5" align="center">
              Interview
            </Typography>
          </ReviewTypeButton>
        </ReviewTypeWrapper>
      </ReviewTypesWrapper>
    </>
  );

  const renderJobReview = () => (
    <>
      <Typography color="white" align="center">
        {companyAndRole}
      </Typography>
      <Spacer height={24} />
      <InputRow>
        <InputLabel>Rating</InputLabel>
        <StarsInput
          value={stars}
          onValue={data => {
            setStars(data);
          }}
          color={Color.rating}
        />
      </InputRow>
      <Spacer height={8} />
      <InputRow>
        <InputLabel>Hourly Salary (CAD)</InputLabel>
        <NumberInput
          error={salaryError}
          type="number"
          size="small"
          value={salary}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSalary(parseInt(e.target.value));
          }}
        />
      </InputRow>
      <Spacer height={8} />
      <StyledTextField
        error={reviewError}
        value={review}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setReview(e.target.value);
        }}
        multiline
        rows={4}
        variant="outlined"
        placeholder="Add your review here"
      />
      <Typography color={isReviewLengthError ? "red" : "white"} align="right">
        {reviewCharacterCountText}
      </Typography>
      <InputRow>
        <InputLabel>Anonymous</InputLabel>
        <Checkbox
          checked={isAnonymous}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsAnonymous(e.target.checked);
          }}
        />
      </InputRow>
      {jobReviewErrorString ? (
        <>
          <Center>
            <Typography color="red">{jobReviewErrorString}</Typography>
          </Center>
          <Spacer height={8} />
        </>
      ) : null}
      <Spacer height={8} />
      <Center>
        <PrimaryButton onClick={onSubmitJobReview}>Submit</PrimaryButton>
      </Center>
      <Spacer height={32} />
      <InputRow>
        <TertiaryButton
          startIcon={<StyledChevronLeftIcon />}
          text="back"
          white
          onClick={onBackToHome}
        />
      </InputRow>
    </>
  );

  const renderInterviewReview = () => (
    <>
      <Typography color="white" align="center">
        {companyAndRole}
      </Typography>
      <Spacer height={24} />
      <InputRow>
        <InputLabel>Difficulty</InputLabel>
        <StarsInput
          value={stars}
          onValue={data => {
            setStars(data);
          }}
          color={Color.compatibility}
        />
      </InputRow>
      <Spacer height={8} />
      <InputRow>
        <InputLabel>Status</InputLabel>
        <Select
          value={interviewStatus}
          onChange={(e: any) => setInterviewStatus(e.target.value)}
        >
          {Object.values(InterviewStatus).map(item => (
            <MenuItem value={item} key={item}>
              {item.split("_").join(" ")}
            </MenuItem>
          ))}
        </Select>
      </InputRow>
      <Spacer height={8} />
      <StyledTextField
        error={reviewError}
        value={review}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setReview(e.target.value);
        }}
        multiline
        rows={4}
        variant="outlined"
        placeholder="Add details about your interview"
      />
      <Typography color={isReviewLengthError ? "red" : "white"} align="right">
        {reviewCharacterCountText}
      </Typography>
      <InputLabel>Resources</InputLabel>
      <Spacer height={4} />
      <InterviewResources />
      <Spacer height={32} />
      <InputRow>
        <InputLabel>Anonymous</InputLabel>
        <Checkbox
          checked={isAnonymous}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsAnonymous(e.target.checked);
          }}
        />
      </InputRow>
      {jobReviewErrorString ? (
        <>
          <Center>
            <Typography color="red">{jobReviewErrorString}</Typography>
          </Center>
          <Spacer height={8} />
        </>
      ) : null}
      <Spacer height={8} />
      <Center>
        <PrimaryButton onClick={onSubmitInterviewReview}>Submit</PrimaryButton>
      </Center>
      <Spacer height={32} />
      <InputRow>
        <TertiaryButton
          startIcon={<StyledChevronLeftIcon />}
          text="back"
          white
          onClick={onBackToHome}
        />
      </InputRow>
    </>
  );

  const renderState = () => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB:
      case AddReviewModalState.REVIEW_JOB_ERROR:
        return renderJobReview();
      case AddReviewModalState.INTERVIEW:
      case AddReviewModalState.INTERVIEW_ERROR:
        return renderInterviewReview();
      default:
        return renderHome();
    }
  };
  return (
    <BaseModal
      open={isOpen}
      title={modalTitle}
      onCloseModal={close}
      maxWidth="xs"
      dark
    >
      {renderState()}
    </BaseModal>
  );
};

const ReviewTypesWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ReviewTypeWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

interface IReviewButton {
  bgcolor: string;
}
const ReviewTypeButton = styled(ButtonBase)<IReviewButton>`
  && {
    padding: 32px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: ${props => props.bgcolor};
  }
`;

const ReviewIcon = styled(StarHalfIcon)`
  && {
    font-size: 72px;
    color: white;
  }
`;

const InterviewIcon = styled(VideoCameraFrontIcon)`
  && {
    font-size: 72px;
    color: white;
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NumberInput = styled(RoundedTextField)`
  && {
    width: 96px;
    text-align: center;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    background-color: white;
    width: 100%;
    border-radius: 8px;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  && {
    color: white;
  }
`;

const InputLabel = styled(Typography).attrs({
  color: "white",
  variant: "subtitle1",
})`
  && {
    font-weight: bold;
  }
`;
