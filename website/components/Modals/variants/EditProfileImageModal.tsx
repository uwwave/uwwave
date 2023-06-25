import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { ProfileImage } from "src/components/HeaderCard/ProfileImage";
import { BaseModal } from "src/components/Modals/BaseModal";
import { Spacer } from "src/components/Spacer/Spacer";
import { useViewport } from "src/lib/hooks/useViewport";
import {
  baseProfileImages,
  getBaseImage,
  getVariantImages,
} from "src/lib/types/profiles";
import styled from "styled-components";

interface IUploadDomainModal {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  currentImage: string;
  onSubmitImage: (imageURL: string) => void;
}

export const EditProfileImageModal = (props: IUploadDomainModal) => {
  const { onClose, isOpen, isLoading, currentImage, onSubmitImage } = props;
  const [image, setImage] = useState(currentImage);
  const baseImage = useMemo(() => {
    return getBaseImage(image);
  }, [image]);

  const imageVariants = useMemo(() => {
    return getVariantImages(getBaseImage(image));
  }, [image]);

  const canUpdateImage = currentImage !== image;
  const { isMobile } = useViewport();
  return (
    <BaseModal
      open={isOpen}
      hasCloseX
      confirmText="Update Profile"
      onCloseModal={onClose}
      onClickOk={() => {
        onSubmitImage(image);
      }}
      title={"Edit Profile Image"}
      dark
      isLoading={isLoading}
      maxWidth="sm"
      disableConfirm={!canUpdateImage}
    >
      <Typography color="white">Base Image</Typography>
      <Spacer height={8} />
      <ImagesWrapper>
        {baseProfileImages.map(x => {
          return (
            <ProfileImage
              key={x}
              imageURL={x}
              width={isMobile ? 96 : 120}
              canEditPhoto
              isSelected={x === baseImage}
              onEditPhoto={() => {
                setImage(x);
              }}
            />
          );
        })}
      </ImagesWrapper>
      <Spacer height={32} />
      <Typography color="white">Variants</Typography>
      <Spacer height={8} />
      <ImagesWrapper>
        {imageVariants.map(x => {
          return (
            <ProfileImage
              key={x}
              imageURL={x}
              width={isMobile ? 96 : 120}
              canEditPhoto
              isSelected={x === image}
              onEditPhoto={() => setImage(x)}
            />
          );
        })}
      </ImagesWrapper>
    </BaseModal>
  );
};

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
