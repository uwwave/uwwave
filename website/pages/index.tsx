import React, { useMemo } from "react";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import { UWaterlooLogo } from "src/components/icons/UWaterlooLogo";
import Paper from "@mui/material/Paper";
import { SearchBar } from "src/components/SearchBar/SearchBar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import BuildIcon from "@mui/icons-material/Build";
import BusinessIcon from "@mui/icons-material/Business";
import FactoryIcon from "@mui/icons-material/Factory";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { BackgroundColor, Color } from "src/styles/color";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { Footer } from "src/components/Footer/Footer";
import { RatingsCell } from "src/components/JobsDataGrid/components/RatingCell";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { useUserContext } from "src/lib/context/User/UserContext";
import { LogoLoader } from "src/components/Loader/LogoLoader";

const generatePillars = (
  pillars: number,
  minHeight: number,
  maxHeight: number
): IWavePillar[] => {
  const out: IWavePillar[] = [];
  for (let i = 0; i < pillars; i++) {
    let color: string;
    switch (i % 3) {
      case 0:
        color = Color.rating;
        break;
      case 1:
        color = Color.salary;
        break;
      default:
        color = Color.compatibility;
    }
    out.push({
      height: Math.random() * (maxHeight - minHeight) + minHeight,
      color,
      delay: Math.random() * 1.2,
    });
  }
  return out;
};

const HomePage = () => {
  const pillars = useMemo(() => {
    return generatePillars(24, 80, 280);
  }, []);

  const { isLoading: isExtensionLoading } = useExtensionsDataContext();
  const { isLoading: userLoading } = useUserContext();
  const isLoading = userLoading || isExtensionLoading;

  const renderDummySearchBar = () => (
    <DummySearchPaper>
      <SearchBar
        listItems={[]}
        Component={() => <></>}
        onSearchValChange={() => null}
        value="My Dream Job..."
      />
      <Spacer height={8} />
      <Stack direction="row" spacing={1}>
        <Chip icon={<BuildIcon />} label="Python" />
        <Chip icon={<BusinessIcon />} label="Microsoft" />
        <Chip icon={<FactoryIcon />} label="AI" />
      </Stack>
      <Spacer height={16} />
      <FiltersWrapper>
        <div>
          <Typography>
            <b>Documents</b>
          </Typography>
          <FormControlLabel
            control={<ExcludeCheckbox />}
            label="Cover Letter"
          />
        </div>
        <Divider orientation="vertical" flexItem />
        <div>
          <Typography>
            <b>Duration</b>
          </Typography>
          <div>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="4 months"
            />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="8 months" />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div>
          <Typography>
            <b>Location</b>
          </Typography>
          <div>
            <FormControlLabel control={<Checkbox />} label="Canada" />
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="USA"
            />
          </div>
          <div>
            <FormControlLabel control={<Checkbox />} label="Asia" />
          </div>
        </div>
      </FiltersWrapper>
      <RelativeWrapper>
        <CompanyCard>
          <CompanyLogo />
          <div>
            <Typography>
              <b>Data Science Co-op</b>
            </Typography>
            <Typography>Microsoft</Typography>
          </div>
          <LocationWrapper>
            <Typography>Seattle</Typography>
            <img
              src="https://cdn-icons-png.flaticon.com/512/555/555526.png"
              width="32px"
              alt=""
            />
          </LocationWrapper>
          <RatingsCell
            ratingPercentage={70}
            moneyPercentage={90}
            scorePercenatge={30}
          />
        </CompanyCard>
      </RelativeWrapper>
    </DummySearchPaper>
  );
  if (isLoading) {
    return (
      <LoaderWrapper>
        <LogoLoader darkMode />
      </LoaderWrapper>
    );
  }
  return (
    <>
      <HeroWrapper>
        <NavigationBar />
        <Container>
          <FadeIn>
            <Spacer height={64} />
            <Title>
              The Ultimate <br /> Waterloo Works Companion
            </Title>
            <Spacer height={16} />
            <SubTitleWrapper>
              <UWaterlooLogo />
              <Spacer width={8} />
              <SubTitle>
                {" "}
                Browse Jobs, Salaries and Reviews with Upgraded Search
              </SubTitle>
            </SubTitleWrapper>
            <Spacer height={64} />
            <Center>
              <PrimaryButton href="/setup">Get Started</PrimaryButton>
            </Center>
            <Spacer height={64} />
            <Center>{renderDummySearchBar()}</Center>
            <Spacer height={128} />
          </FadeIn>
          <WaveDesignWrapper>
            {pillars.map((x, i) => (
              <WavePillar key={i} {...x} />
            ))}
          </WaveDesignWrapper>
        </Container>
      </HeroWrapper>
      <Footer />
    </>
  );
};

export default HomePage;

const LoaderWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${BackgroundColor.darker};
`;
interface IWavePillar {
  height: number;
  color: string;
  delay: number;
}
const WavePillar = styled.div<IWavePillar>`
  width: 40px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  animation: anim 1s ease backwards;
  animation-delay: ${props => props.delay}s;

  @keyframes anim {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
const WaveDesignWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 16px;
  height: 300px;
  overflow: hidden;
`;

const HeroWrapper = styled.div`
  width: 100%;
  background: ${BackgroundColor.dark};

  position: relative;
`;

const Title = styled(Typography).attrs({
  variant: "h2",
})`
  && {
    color: white;
    text-align: center;
    font-weight: bold;
    text-shadow: 1px 4px rgba(7, 20, 30, 0.42);
  }
`;

const SubTitle = styled(Typography).attrs({
  variant: "h5",
})`
  && {
    color: white;
    text-align: center;
  }
`;

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DummySearchPaper = styled(Paper).attrs({
  variant: "outlined",
})`
  && {
    padding: 16px;
    max-width: 500px;
    width: 100%;
    pointer-events: none;
    user-select: none;
    box-shadow: 2px 2px 8px rgba(7, 20, 30, 0.42);
  }
`;

const ExcludeCheckbox = styled(Checkbox).attrs({
  defaultChecked: true,
  indeterminate: true,
})`
  && svg {
    fill: red;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const RelativeWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CompanyCard = styled(Paper).attrs({
  variant: "outlined",
})`
  padding: 8px;
  position: absolute;
  top: -40px;
  left: -32px;
  display: flex;
  gap: 24px;
  align-items: center;
  box-shadow: 2px 2px 8px rgba(7, 20, 30, 0.42);
`;
const CompanyLogo = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 4px;
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const LocationWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FadeIn = styled.div`
  animation: fadein 1s ease backwards;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
