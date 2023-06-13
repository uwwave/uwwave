import { useEffect, useState, useContext } from "react";
import { buildCoopJobWithJobID } from "../jobsList/jobsList";
import { useExtensionData } from "../extension/hooks/useExtensionData";
import { extractTechFromText } from "../genTechStack/genTechStack";
import { Requests } from "../requests/Requests";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { JobTagsContext } from "src/lib/context/jobTags/JobTagsContext";

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
export const useJobPage = (jobID?: string) => {
  const { extensionData: jobs } = useExtensionData();
  const [tabSelected, setTabSelected] = useState(0);
  const [companyURL, setCompanyURL] = useState<string | undefined>(undefined);
  const [imageURL, setImageURL] = useState<string>("");
  const [init, setInit] = useState(false);
  const job = buildCoopJobWithJobID(jobs, jobID as unknown as number);
  const jobInfo: JobInfo[] = [
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
  ];
  const jobTagsContext = useContext(JobTagsContext);
  if (!jobTagsContext) {
    throw new Error("JobTagsProvider not wrapped");
  }
  const { isLoading: isTagsLoading } = jobTagsContext;

  const companyInfo: CompanyCard = {
    companyName: job?.companyName ?? "",
    city: job?.city ?? "",
    country: job?.country ?? "",
    positionTitle: job?.jobName ?? "",
  };

  useEffect(() => {
    if (jobInfo.length === 0 || !companyInfo.companyName || init) {
      return;
    }
    Requests.getCompanyInfo(companyInfo.companyName)
      .then((res: ICompanyClearbitData) => {
        setImageURL(res.logo ?? "/logo.png");
        setCompanyURL(res.domain);
        setInit(true);
      })
      .catch((err: any) => {
        setImageURL("/logo.png");
        setCompanyURL("");
        setInit(true);
        console.log(err);
      });
  }, [companyInfo, jobInfo]);

  const onClearbitData = (data: any) => {
    setImageURL(data.logo);
    setCompanyURL(data.domain);
  };

  const techIcons = extractTechFromText(jobInfo.map(x => x.text).join(""));

  const isLoading =
    !imageURL ||
    jobInfo.length === 0 ||
    companyInfo.positionTitle === "" ||
    job === null ||
    companyURL === undefined ||
    isTagsLoading;

  return {
    imageURL,
    companyInfo,
    job,
    tabSelected,
    setTabSelected,
    jobInfo,
    isLoading,
    techIcons,
    companyURL,
    onClearbitData,
  };
};
