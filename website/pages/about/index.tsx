import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import Paper from "@mui/material/Paper";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { BackgroundColor, Color } from "src/styles/color";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import EmailIcon from "@mui/icons-material/Email";
import { useViewport } from "src/lib/hooks/useViewport";

interface IMember {
  name: string;
  imageURL: string;
  title: string;
  color?: string;
}

const mainTeam: IMember[] = [
  {
    name: "Bryan",
    imageURL: "bryan.png",
    title: "Design & Full Stack",
    color: Color.rating,
  },
  {
    name: "Michelle",
    imageURL: "michelle.png",
    title: "Machine Learning",
    color: Color.salary,
  },
  {
    name: "William",
    imageURL: "william.png",
    title: "Extension",
    color: Color.interview,
  },
  {
    name: "Linda",
    imageURL: "linda.png",
    title: "Frontend",
    color: Color.rating,
  },
  {
    name: "Andrew",
    imageURL: "andrew.png",
    title: "Frontend",
    color: Color.salary,
  },
];

const AboutPage = () => {
  const { isMobile } = useViewport();
  const renderHeader = () => (
    <>
      <Typography variant={isMobile ? "subtitle1" : "h5"} align="center">
        UW Wave is a Capstone Project created by SE2024s
      </Typography>
      <Spacer height={isMobile ? 32 : 64} />
      <Typography variant={isMobile ? "h5" : "h4"} align="center">
        <b>Meet The Team</b>
      </Typography>
    </>
  );

  const renderProfile = (x: IMember) => (
    <ProfileWrapper key={x.name}>
      <RelativeWrapper>
        {x.color ? <ProfileImageBackground color={x.color} /> : null}
        <ProfileImageWrapper imageURL={x.imageURL} />
      </RelativeWrapper>
      <Spacer height={4} />
      <Name>
        <b>{x.name}</b>
      </Name>
      <Spacer height={4} />
      <Name>{x.title}</Name>
    </ProfileWrapper>
  );
  const renderMobileMainTeamProfiles = () => (
    <PicturesRow>{mainTeam.map(x => renderProfile(x))}</PicturesRow>
  );
  const renderDesktopMainTeamProfiles = () => (
    <>
      <PicturesRow>
        {mainTeam.slice(0, 3).map(x => renderProfile(x))}
      </PicturesRow>
      <PicturesRow>
        {mainTeam.slice(3, 5).map(x => renderProfile(x))}
      </PicturesRow>
    </>
  );
  const renderBody = () => (
    <>
      {isMobile
        ? renderMobileMainTeamProfiles()
        : renderDesktopMainTeamProfiles()}
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
          <ProfileImage imageURL="logo.png" />
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
      HeaderComponents={[renderHeader()]}
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

const ProfileImage = styled.div<IProfileImageWrapper>`
  width: 144px;
  height: 144px;
  border-radius: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${props => props.imageURL});
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
