import { useEffect, useMemo, useState } from "react";
import { buildCoopJobWithJobID } from "../jobsList/jobsList";
import { useExtensionData } from "../extension/hooks/useExtensionData";
import axios from "axios";
import { extractTechFromText } from "../genTechStack/genTechStack";

type JobInfo = {
  title: string;
  text: string;
};
type CompanyCard = {
  companyName: string;
  city: string;
  country: string;
  positionTitle: string;
};
export const useJobePage = (jobID?: string) => {
  const { extensionData: jobs } = useExtensionData();
  const [companyInfo, setCompanyInfo] = useState<CompanyCard>({
    companyName: "",
    city: "",
    country: "",
    positionTitle: "",
  });
  const [tabSelected, setTabSelected] = useState(0);
  const [imageURL, setImageURL] = useState<string>("");
  const [jobInfo, setJobInfo] = useState<JobInfo[]>([]);

  const job = useMemo(
    () => buildCoopJobWithJobID(jobs, jobID as unknown as number),
    [jobs, jobID]
  );

  useEffect(() => {
    setJobInfo([
      {
        title: "Job Summary",
        text:
          job?.jobSummary.replace(
            /<\s*(?:table|tr)[^>]*>|<\/\s*(?:table|tr)\s*>/g,
            ""
          ) ?? "",
      },
      {
        title: "Job Responsibilities",
        text:
          job?.jobResponsibilities.replace(
            /<\s*(?:table|tr)[^>]*>|<\/\s*(?:table|tr)\s*>/g,
            ""
          ) ?? "",
      },
      {
        title: "Required Skills",
        text:
          job?.requiredSkills.replace(
            /<\s*(?:table|tr)[^>]*>|<\/\s*(?:table|tr)\s*>/g,
            ""
          ) ?? "",
      },
    ]);

    setCompanyInfo({
      companyName: job?.companyName ?? "",
      city: job?.city ?? "",
      country: job?.country ?? "",
      positionTitle: job?.jobName ?? "",
    });
  }, [job]);
  useEffect(() => {
    axios
      .get(
        `https://842gb0w279.execute-api.ca-central-1.amazonaws.com/items/${companyInfo.companyName}`
      )
      .then((res: any) => {
        if (res.data.Item) {
          setImageURL(res.data.Item.logo);
          const dashIndex = res.data.Item.salary.indexOf("-");
          let salary = `$${res.data.Item.salary}`;
          if (dashIndex >= 0)
            salary = `${salary.slice(0, dashIndex + 2)}$${salary.slice(
              dashIndex + 2
            )}`;
          if (res.data.Item.Currency) salary += ` ${res.data.Item.Currency}`;

          setJobInfo([
            ...jobInfo,
            {
              title: "Salary",
              text: salary,
            },
            {
              title: "Company Website",
              text: `<a href=//${res.data.Item.domain} target='_blank'>${res.data.Item.domain}</a>`,
            },
          ]);
        } else {
          setImageURL("/logo.png");
        }
      })
      .catch((err: any) => {
        console.error(err);
        setImageURL("/logo.png");
      });
  }, [companyInfo, jobInfo]);

  const techIcons = extractTechFromText(jobInfo.map(x => x.text).join(""));

  const isLoading =
    !imageURL ||
    jobInfo.length === 0 ||
    companyInfo.positionTitle === "" ||
    job === null;

  return {
    imageURL,
    companyInfo,
    job,
    tabSelected,
    setTabSelected,
    jobInfo,
    isLoading,
    techIcons,
  };
};
