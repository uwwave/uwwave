import { BaseModal } from "src/components/Modals/BaseModal";
import React from "react";
import { SearchWithMenuInput } from "src/components/TextField/SearchWithMenuInput";
import BusinessIcon from "@mui/icons-material/Business";
import styled from "styled-components";
import { Color } from "src/styles/color";
import { useAddReviewModal } from "src/lib/hooks/useAddReviewModal";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Spacer } from "src/components/Spacer/Spacer";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

interface IAddReviewModal {
  isOpen: boolean;
  close: () => void;
}
export const AddReviewModal = ({ isOpen, close }: IAddReviewModal) => {
  const {
    handleSearch,
    companyInfo,
    isLoading,
    rolesInfo,
    isRolesLoading,
    handleSearchRole,
  } = useAddReviewModal();
  return (
    <BaseModal
      open={isOpen}
      title={"Add Your Review"}
      onCloseModal={close}
      maxWidth="xs"
      dark
    >
      <SearchWithMenuInput
        menuItems={companyInfo.map(x => ({
          value: x.companyName,
          icon: x.logo ? <CompanyLogo logo={x.logo} /> : <StyledBusinessIcon />,
        }))}
        selectedIcon={<StyledBusinessIcon />}
        onChangeValue={(val: string) => {
          console.log(val);
        }}
        onChangeSearchValue={handleSearch}
        isLoading={isLoading}
        placeholder="Company"
        zIndex={101}
      />
      <Spacer height={4} />
      <SearchWithMenuInput
        menuItems={rolesInfo.map(x => ({
          value: x.role,
          icon: <RoleIcon />,
        }))}
        selectedIcon={<RoleIcon />}
        onChangeValue={(val: string) => {
          console.log(val);
        }}
        onChangeSearchValue={handleSearchRole}
        isLoading={isRolesLoading}
        placeholder="Role"
      />
      <Spacer height={8} />
      <Typography color="white" align="center" variant="subtitle1">
        Select a Review Type
      </Typography>
      <Spacer height={8} />
      <ReviewTypesWrapper>
        <ReviewTypeWrapper>
          <ReviewTypeButton bgcolor={Color.rating}>
            <ReviewIcon />
            <Typography color="white" variant="h5" align="center">
              Job
            </Typography>
          </ReviewTypeButton>
        </ReviewTypeWrapper>
        <ReviewTypeWrapper>
          <ReviewTypeButton bgcolor={Color.compatibility}>
            <InterviewIcon />
            <Typography color="white" variant="h5" align="center">
              Interview
            </Typography>
          </ReviewTypeButton>
        </ReviewTypeWrapper>
      </ReviewTypesWrapper>
    </BaseModal>
  );
};

const StyledBusinessIcon = styled(BusinessIcon)`
  && {
    color: ${Color.rating};
    font-size: 32px;
  }
`;

const RoleIcon = styled(WorkOutlineIcon)`
  && {
    font-size: 32px;
  }
`;

interface ICompanyLogo {
  logo: string;
}
const CompanyLogo = styled.div<ICompanyLogo>`
  width: 32px;
  height: 32px;
  background-image: url(${props => props.logo});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
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
