import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import ButtonBase from "@mui/material/ButtonBase";
import { EditProfileImageModal } from "../Modals/variants/EditProfileImageModal";
import { Color } from "src/styles/color";
import { useState } from "react";
import { Requests } from "src/lib/requests/Requests";
import { useUserContext } from "src/lib/context/User/UserContext";

interface IProfileImage {
  canEditPhoto?: boolean;
  onEditPhoto?: () => void;
  imageURL: string;
  showEditIcon?: boolean;
  width?: number;
  isSelected?: boolean;
}
export const ProfileImageWithModal = ({
  canEditPhoto,
  imageURL,
  showEditIcon,
  width,
  isSelected,
}: IProfileImage) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refetchUser } = useUserContext();
  const onSubmitImage = async (imageURL: string) => {
    setLoading(true);
    try {
      await Requests.patchProfilePhoto(imageURL);
      await refetchUser();
    } catch (e) {
      console.log("ERROR", e, imageURL);
    }
    setLoading(false);
    setIsOpen(false);
  };
  return (
    <>
      <EditProfileImageModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        currentImage={imageURL}
        onSubmitImage={onSubmitImage}
        isLoading={loading}
      />
      <Main widthSize={width ?? 160} disabled={!canEditPhoto}>
        <ImageWrapper
          src={imageURL}
          widthSize={width ?? 160}
          isSelected={isSelected ?? false}
          onClick={() => {
            setIsOpen(true);
          }}
        />
        {canEditPhoto && showEditIcon ? (
          <StyledIconButton
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <EditIcon />
          </StyledIconButton>
        ) : null}
      </Main>
    </>
  );
};

export const ProfileImage = ({
  canEditPhoto,
  onEditPhoto,
  imageURL,
  showEditIcon,
  width,
  isSelected,
}: IProfileImage) => {
  return (
    <>
      <Main
        widthSize={width ?? 160}
        onClick={onEditPhoto}
        disabled={!canEditPhoto}
      >
        <ImageWrapper
          src={imageURL}
          widthSize={width ?? 160}
          isSelected={isSelected ?? false}
        />
        {canEditPhoto && showEditIcon ? (
          <StyledIconButton onClick={onEditPhoto}>
            <EditIcon />
          </StyledIconButton>
        ) : null}
      </Main>
    </>
  );
};

interface IWidth {
  widthSize: number;
}
interface IImageWrapper {
  src: string;
  isSelected: boolean;
}
const ImageWrapper = styled.div<IImageWrapper & IWidth>`
  min-width: ${props => props.widthSize}px;
  width: ${props => props.widthSize}px;
  height: ${props => props.widthSize}px;
  border: ${props =>
    props.isSelected ? `4px solid ${Color.primaryButton}` : `1.6px solid #ddd`};
  border-radius: 8px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Main = styled(ButtonBase)<IWidth>`
  position: relative;
  width: ${props => props.widthSize}px;
`;

const StyledIconButton = styled(EditIcon)`
  && {
    position: absolute;
    top: 8px;
    right: 8px;
    color: white;
  }
`;
