import { SecondaryButton } from "./SecondaryButton";
import { Color } from "src/styles/color";
import styled from "styled-components";
import React, { useMemo, useState } from "react";
import { SpecificJobPageSection } from "../SpecificJobPageSection/SpecificJobPageSection";
import {
  AppDeliveryFields,
  AppInfoFields,
  JobInfoFieldsCoop,
} from "src/lib/extension/jobKeys";
import ReactHtmlParser from "react-html-parser";

interface IShowMoreButton {
  extraJobInfo: any;
}
export const ShowMoreButton = (props: IShowMoreButton) => {
  const { extraJobInfo } = props;
  const [showMore, setShowMore] = useState(false);

  // list of information to include
  // update each time new field is added or removed to a specific job page
  const allowedJobInfo: string[] = [
    'Location',
    JobInfoFieldsCoop.additionalInformation,
    JobInfoFieldsCoop.additionalJobIdentifiers,
    JobInfoFieldsCoop.employerInternalJobNumber,
    JobInfoFieldsCoop.jobCategoryNoc,
    JobInfoFieldsCoop.jobType,
    JobInfoFieldsCoop.level,
    JobInfoFieldsCoop.specialJobRequirements,
    JobInfoFieldsCoop.targetedDegreesAndDisciplines,
    JobInfoFieldsCoop.workTerm,
    JobInfoFieldsCoop.workTermDuration,
    JobInfoFieldsCoop.transportationAndHousing,
    ...Object.values(AppInfoFields),
    ...Object.values(AppDeliveryFields),
  ];
  const extraInfoString: string = useMemo(() => {
    const filteredInfo = Object.keys(extraJobInfo)
      .filter(key => allowedJobInfo.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: extraJobInfo[key],
        };
      }, {});
    let htmlString = "<ul>";
    Object.entries(filteredInfo).forEach(([key, value]) => {
      htmlString += "<li><strong>" + key + ":</strong> " + value + "</li>";
    });
    htmlString += "</ul>";
    return htmlString;
  }, [extraJobInfo]);

  return (
    <MainWrapper>
      {showMore ? (
        <SpecificJobPageSection
          jobSectionTitle={"Extra Info"}
          jobSectionDescription={ReactHtmlParser(extraInfoString) as any}
        />
      ) : (
        <></>
      )}
      <StyledButton
        onClick={() => {
          setShowMore(!showMore);
        }}
      >
        {showMore ? "Show Less" : "Show More"}
      </StyledButton>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  position: relative;
`;

const StyledButton = styled(SecondaryButton)`
  && {
    color: ${Color.tagged};
    border-color: ${Color.tagged};
    box-shadow: 2px 3px ${Color.taggedShadow};
    margin: 10px;
  }
`;
