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
  CANNOT_FIND_COMPANY_STRING,
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
import ChevronRightIcon from "@mui/icons-material/ArrowForwardIos";
import { Select } from "src/components/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import { InterviewResources } from "src/components/InterviewResources/InterviewResources";
import { LogoLoader } from "src/components/Loader/LogoLoader";
import { IJobReview } from "src/database/models/JobReview";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Page } from "src/lib/types/page";
import { IInterviewReview } from "src/database/models/InterviewReview";
import { coopNumberDisplay } from "src/lib/reviews/summary";
import { LocationsSearchInput } from "src/components/TextField/variants/LocationSearchInput";
import { getCountryFlag } from "src/components/CountryFlag/CountryFlag";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { SubmitDomainInput } from "src/components/SubmitDomainInput/SubmitDomainInput";
interface IAddReviewModal {
  isOpen: boolean;
  company?: ICompanyClearbitData;
  review?: IJobReview;
  interview?: IInterviewReview;
  afterSubmit?: () => void;
  close: () => void;
  origin?: Page;
}

export const AddReviewModal = ({
  isOpen,
  afterSubmit,
  close,
  company,
  review: reviewProp,
  origin,
  interview,
}: IAddReviewModal) => {
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
    onBack,
    onNext,
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
    meaningfulStars,
    setMeaninfgulStars,
    workLifeStars,
    setWorkLifeStars,
    mentorshipStars,
    setMentorshipStars,
    progress,
    showNextButton,
    disableNextButton,
    setLocation,
    location,
    onSubmitCompanySuccess,
    companyState,
  } = useAddReviewModal(
    close,
    afterSubmit,
    company ?? reviewProp?.company ?? interview?.company,
    reviewProp,
    origin,
    interview
  );

  const renderUploadDomain = () => {
    return (
      <>
        <SubmitDomainInput onSuccess={onSubmitCompanySuccess} />
        {renderBackButton()}
      </>
    );
  };
  const renderSearchCompany = () => {
    return (
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
          emptyMenuItem={{
            value: CANNOT_FIND_COMPANY_STRING,
            icon: <SearchOffIcon />,
          }}
          initCompany={companyState}
        />
      ) : (
        <CompanySearchInput />
      )
    );
  };
  const renderHome = () => (
    <>
      {renderSearchCompany()}
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
            disabled={state === AddReviewModalState.HOME_SUBMIT_DOMAIN}
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
          <ReviewTypeButton
            bgcolor={Color.rating}
            onClick={onClickJobReview}
            disabled={state === AddReviewModalState.HOME_SUBMIT_DOMAIN}
          >
            <ReviewIcon />
            <Typography color="white" variant="h5" align="center">
              Job
            </Typography>
          </ReviewTypeButton>
        </ReviewTypeWrapper>
        <ReviewTypeWrapper>
          <ReviewTypeButton
            bgcolor={Color.interview}
            onClick={onClickInterviewReview}
            disabled={state === AddReviewModalState.HOME_SUBMIT_DOMAIN}
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

  const renderJobSubmitUpdateButton = () =>
    state !== AddReviewModalState.REVIEW_JOB_DELETE ? (
      <Center>
        <PrimaryButton
          onClick={onSubmitJobReview}
          disabled={state === AddReviewModalState.REVIEW_JOB_LOADING}
        >
          {state === AddReviewModalState.REVIEW_JOB_LOADING ? (
            <LogoLoader width={32} darkMode />
          ) : (
            submitText
          )}
        </PrimaryButton>
      </Center>
    ) : null;

  const renderDeleteButton = () =>
    isUpdateReview && state !== AddReviewModalState.REVIEW_JOB_DELETE ? (
      <>
        <Spacer height={16} />
        <Center>
          <TertiaryButton
            startIcon={<StyledDeleteOutlineIcon />}
            text={"Delete"}
            white
            onClick={toggleDeleteMode}
          />
        </Center>
      </>
    ) : null;

  const renderDeleteInterviewButton = () =>
    isUpdateInterview && state !== AddReviewModalState.INTERVIEW_DELETE ? (
      <>
        <Spacer height={16} />
        <Center>
          <TertiaryButton
            startIcon={<StyledDeleteOutlineIcon />}
            text={"Delete"}
            white
            onClick={toggleDeleteMode}
          />
        </Center>
      </>
    ) : null;

  const renderBackButton = () =>
    isBackToHomeDisabled ? null : (
      <>
        <Spacer height={128} />
        <InputRow>
          <TertiaryButton
            startIcon={<StyledChevronLeftIcon />}
            text="Back"
            white
            onClick={onBack}
          />
          {progress ? <Typography color="white">{progress}</Typography> : null}
          {showNextButton ? (
            <TertiaryButton
              endIcon={<StyledChevronRightIcon />}
              text="Next"
              white
              onClick={onNext}
              disabled={disableNextButton}
            />
          ) : null}
        </InputRow>
      </>
    );

  const renderErrorMessage = () =>
    jobReviewErrorString ? (
      <>
        <Center>
          <Typography color="red">{jobReviewErrorString}</Typography>
        </Center>
        <Spacer height={8} />
      </>
    ) : null;

  const renderIsAnonymousInput = () => (
    <InputRow>
      <InputLabel>Anonymous</InputLabel>
      <Checkbox
        checked={isAnonymous}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsAnonymous(e.target.checked);
        }}
      />
    </InputRow>
  );

  const renderReviewTextField = () => (
    <>
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
    </>
  );

  const renderSalaryInput = () => (
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
  );

  const renderCompanyAndRoleTitle = () => (
    <Typography color="white" align="center">
      {companyAndRole}
    </Typography>
  );

  const renderJobStarsInput = () => (
    <>
      <InputRow>
        <InputLabel>Mentorship</InputLabel>
        <StarsInput
          value={mentorshipStars}
          onValue={data => {
            setMentorshipStars(data);
          }}
          color={Color.rating}
        />
      </InputRow>
      <InputRow>
        <InputLabel>Work-Life Balance</InputLabel>
        <StarsInput
          value={workLifeStars}
          onValue={data => {
            setWorkLifeStars(data);
          }}
          color={Color.rating}
        />
      </InputRow>
      <InputRow>
        <InputLabel>Meaningful Work</InputLabel>
        <StarsInput
          value={meaningfulStars}
          onValue={data => {
            setMeaninfgulStars(data);
          }}
          color={Color.rating}
        />
      </InputRow>
    </>
  );

  const renderConfirmDelete = () => {
    if (
      state !== AddReviewModalState.REVIEW_JOB_DELETE &&
      state !== AddReviewModalState.INTERVIEW_DELETE
    ) {
      return null;
    }
    return (
      <>
        <Typography color="red" align="center">
          Are you sure you want to delete this reviews? This action can't be
          undone
        </Typography>
        <Spacer height={16} />
        <Center>
          <DeleteButton
            onClick={
              state === AddReviewModalState.REVIEW_JOB_DELETE
                ? onDeleteReview
                : onDeleteInterview
            }
          >
            <StyledDeleteOutlineIcon />
            Confirm Delete
          </DeleteButton>
        </Center>
        <Spacer height={16} />
        <Center>
          <TertiaryButton text={"Cancel"} white onClick={toggleDeleteMode} />
        </Center>
      </>
    );
  };
  const renderJobReview = () => (
    <>
      {renderCompanyAndRoleTitle()}
      <Spacer height={24} />
      {renderLocationInput()}
      <Spacer height={8} />
      {renderCoopNumberInput()}
      <Spacer height={8} />
      {renderSalaryInput()}
      <Spacer height={16} />
      {renderJobStarsInput()}
      <Spacer height={32} />
      {renderReviewTextField()}
      {renderIsAnonymousInput()}
      {renderErrorMessage()}
      <Spacer height={8} />
      {renderJobSubmitUpdateButton()}
      {renderDeleteButton()}
      {renderConfirmDelete()}
      {renderBackButton()}
    </>
  );

  const renderJobReview2 = () => (
    <>
      {renderCompanyAndRoleTitle()}
      <Spacer height={24} />
      {renderJobStarsInput()}
      <Spacer height={32} />
      {renderReviewTextField()}
      {renderIsAnonymousInput()}
      {renderErrorMessage()}
      <Spacer height={8} />
      {renderJobSubmitUpdateButton()}
      {renderBackButton()}
    </>
  );

  const renderJobReview1 = () => (
    <>
      {renderCompanyAndRoleTitle()}
      <Spacer height={24} />
      {renderLocationInput()}
      <Spacer height={8} />
      {renderCoopNumberInput()}
      <Spacer height={8} />
      {renderSalaryInput()}
      {renderBackButton()}
    </>
  );

  const renderDifficultyStarsInput = () => (
    <InputRow>
      <InputLabel>Difficulty</InputLabel>
      <StarsInput
        value={stars}
        onValue={data => {
          setStars(data);
        }}
        color={Color.primaryButton}
      />
    </InputRow>
  );

  const renderInterviewStatusInput = () => (
    <InputRow>
      <InputLabel>Status</InputLabel>
      <Select
        value={interviewStatus}
        onChange={(e: any) => setInterviewStatus(e.target.value)}
        size="small"
      >
        {Object.values(InterviewStatus).map(item => (
          <MenuItem value={item} key={item}>
            {item.split("_").join(" ")}
          </MenuItem>
        ))}
      </Select>
    </InputRow>
  );
  const renderLocationInput = () => {
    return (
      <LocationsSearchInput
        onValue={(data?: string) => {
          setLocation(data ?? "");
        }}
        initialValue={
          location
            ? {
                value: location,
                icon: getCountryFlag(
                  location.startsWith("Remote in")
                    ? location.split(" in ")[1]
                    : location.split(", ")[1]
                ),
              }
            : undefined
        }
      />
    );
  };

  const renderCoopNumberInput = () => {
    return (
      <InputRow>
        <InputLabel>Co-op number</InputLabel>
        <Select
          value={coopNumber}
          onChange={(e: any) => setCoopNumber(e.target.value)}
          size="small"
        >
          {[1, 2, 3, 4, 5, 6, 7, 0].map(item => {
            return (
              <MenuItem value={item} key={item}>
                {coopNumberDisplay(item)}
              </MenuItem>
            );
          })}
        </Select>
      </InputRow>
    );
  };

  const renderResourcesInput = () => (
    <>
      <InputLabel>{`Resources (${nValidResources})`}</InputLabel>
      <Spacer height={4} />
      <InterviewResources
        interviewResources={interviewResources}
        setInterviewResources={setInterviewResources}
      />
    </>
  );

  const renderInterviewSubmitUpdateButton = () =>
    state !== AddReviewModalState.INTERVIEW_DELETE ? (
      <Center>
        <PrimaryButton
          onClick={onSubmitInterviewReview}
          disabled={state === AddReviewModalState.INTERVIEW_LOADING}
        >
          {state === AddReviewModalState.INTERVIEW_LOADING ? (
            <LogoLoader width={32} darkMode />
          ) : (
            submitText
          )}
        </PrimaryButton>
      </Center>
    ) : null;

  const renderInterviewReview = () => (
    <>
      {renderCompanyAndRoleTitle()}
      <Spacer height={24} />
      {renderDifficultyStarsInput()}
      <Spacer height={8} />
      {renderInterviewStatusInput()}
      <Spacer height={8} />
      {renderReviewTextField()}
      {renderResourcesInput()}
      <Spacer height={32} />
      {renderIsAnonymousInput()}
      {renderErrorMessage()}
      <Spacer height={8} />
      {renderInterviewSubmitUpdateButton()}
      {renderDeleteInterviewButton()}
      {renderConfirmDelete()}
      {renderBackButton()}
    </>
  );

  const renderState = () => {
    switch (state) {
      case AddReviewModalState.REVIEW_JOB_1:
        return renderJobReview1();
      case AddReviewModalState.REVIEW_JOB_2:
        return renderJobReview2();
      case AddReviewModalState.REVIEW_JOB_UPDATE:
      case AddReviewModalState.REVIEW_JOB_ERROR:
      case AddReviewModalState.REVIEW_JOB_LOADING:
      case AddReviewModalState.REVIEW_JOB_DELETE:
        return renderJobReview();
      case AddReviewModalState.INTERVIEW:
      case AddReviewModalState.INTERVIEW_ERROR:
      case AddReviewModalState.INTERVIEW_DELETE:
      case AddReviewModalState.INTERVIEW_LOADING:
        return renderInterviewReview();
      case AddReviewModalState.HOME_SUBMIT_DOMAIN:
        return renderUploadDomain();
      default:
        return renderHome();
    }
  };

  const renderVerifiedDisclaimer = () => {
    if (
      state !== AddReviewModalState.HOME &&
      state !== AddReviewModalState.HOME_ERROR
    ) {
      return undefined;
    }
    return (
      <BannerWrapper>
        <Typography color="white" align="center">
          You're adding an <b>unverified</b> review. You can verify it after on
          your account page
        </Typography>
      </BannerWrapper>
    );
  };
  return (
    <BaseModal
      open={isOpen}
      title={modalTitle}
      onCloseModal={close}
      maxWidth="xs"
      dark
      header={renderVerifiedDisclaimer()}
    >
      {renderState()}
    </BaseModal>
  );
};

const BannerWrapper = styled.div`
  background-color: ${Color.primaryButton};
  padding: 8px;
`;
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

const StyledChevronRightIcon = styled(ChevronRightIcon)`
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

const StyledDeleteOutlineIcon = styled(DeleteOutlineIcon)`
  && {
    color: white;
  }
`;

const DeleteButton = styled(PrimaryButton)`
  && {
    background-color: ${Color.ambitious}!important;
    box-shadow: 3px 4px ${Color.red2};
  }
`;
