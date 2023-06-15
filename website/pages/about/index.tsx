import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import Paper from "@mui/material/Paper";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { BackgroundColor, Color } from "src/styles/color";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import EmailIcon from "@mui/icons-material/Email";
const AboutPage = () => {
  const renderHeader = () => (
    <>
      <Typography variant="h5" align="center">
        UW Wave is a Capstone Project created by SE2024s
      </Typography>
      <Spacer height={64} />
      <Typography variant="h4" align="center">
        <b>Meet The Team</b>
      </Typography>
    </>
  );

  const renderBody = () => (
    <>
      <PicturesRow>
        <ProfileWrapper>
          <RelativeWrapper>
            <ProfileImageBackground color={Color.rating} />
            <ProfileImageWrapper imageURL="bryan.png" />
          </RelativeWrapper>
          <Spacer height={4} />
          <Name>
            <b>Bryan</b>
          </Name>
          <Spacer height={4} />
          <Name>Design & Full Stack</Name>
        </ProfileWrapper>
        <ProfileWrapper>
          <RelativeWrapper>
            <ProfileImageBackground color={Color.salary} />
            <ProfileImageWrapper imageURL="michelle.png" />
          </RelativeWrapper>
          <Spacer height={4} />
          <Name>
            <b>Michelle</b>
          </Name>
          <Spacer height={4} />
          <Name>Machine Learning</Name>
        </ProfileWrapper>
        <ProfileWrapper>
          <RelativeWrapper>
            <ProfileImageBackground color={Color.compatibility} />
            <ProfileImageWrapper imageURL="william.png" />
          </RelativeWrapper>
          <Spacer height={4} />
          <Name>
            <b>William</b>
          </Name>
          <Spacer height={4} />
          <Name>Extension</Name>
        </ProfileWrapper>
      </PicturesRow>
      <Spacer height={32} />
      <PicturesRow>
        <ProfileWrapper>
          <RelativeWrapper>
            <ProfileImageBackground color={Color.rating} />
            <ProfileImageWrapper imageURL="linda.png" />
          </RelativeWrapper>
          <Spacer height={4} />
          <Name>
            <b>Linda</b>
          </Name>
          <Spacer height={4} />
          <Name>Frontend</Name>
        </ProfileWrapper>

        <ProfileWrapper>
          <RelativeWrapper>
            <ProfileImageBackground color={Color.salary} />
            <ProfileImageWrapper imageURL="andrew.png" />
          </RelativeWrapper>
          <Spacer height={4} />
          <Name>
            <b>Andrew</b>
          </Name>
          <Spacer height={4} />
          <Name>Frontend</Name>
        </ProfileWrapper>
      </PicturesRow>
      <Spacer height={32} />
      <ContactPaper>
        <Typography variant="h5" align="center">
          <b>Contact</b>
        </Typography>
        <Spacer height={16} />
        <Typography align="center">
          Have feedback, questions, or concerns about Wave? Don’t hesitate to
          reach out!
        </Typography>
        <Spacer height={32} />
        <PrimaryButton href="mailto:uwaterloowave@gmail.com">
          <EmailIcon />
          Email
        </PrimaryButton>
      </ContactPaper>
      <Spacer height={32} />
      <Name variant="h6" align="center">
        <b>Contributors</b>
      </Name>
      <Spacer height={32} />
      <PicturesRow>
        <ProfileWrapper>
          <RelativeWrapper>
            <ProfileImageBackground color={Color.rating} />
            <ProfileImageWrapper imageURL="yiwei.png" />
          </RelativeWrapper>
          <Spacer height={4} />
          <Name>
            <b>Yi Wei</b>
          </Name>
          <Spacer height={4} />
          <Name>Backend</Name>
        </ProfileWrapper>
      </PicturesRow>
    </>
  );
  return (
    <PageWrapper
      Header={renderHeader()}
      Body={renderBody()}
      lighterBackground
    />
  );
};

export default AboutPage;

const RelativeWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
`;

interface IProfileImageWrapper {
  imageURL: string;
}
const ProfileImageWrapper = styled.div<IProfileImageWrapper>`
  width: 144px;
  height: 144px;
  border-radius: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${props => props.imageURL});
  position: absolute;
  top: 0;
  left: 0;
`;

interface IProfileImageBackground {
  color: string;
}
const ProfileImageBackground = styled.div<IProfileImageBackground>`
  width: 152px;
  height: 152px;
  border-radius: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: ${props => props.color};
`;

const PicturesRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled(Typography)`
  && {
    color: white;
  }
`;

const ContactPaper = styled(Paper).attrs({
  variant: "outlined",
})`
  && {
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${BackgroundColor.darker};
  }

  && .MuiTypography-root {
    color: white;
  }
`;
