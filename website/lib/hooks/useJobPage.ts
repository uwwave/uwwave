import { useEffect, useState } from "react";
import { buildCoopJobWithJobID } from "../jobsList/jobsList";
import { extractTechFromText } from "../genTechStack/genTechStack";
import { Requests } from "src/lib/requests/Requests";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { useJobTagsContext } from "src/lib/context/jobTags/JobTagsContext";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";

type JobInfo = {
  title: string;
  text: string;
};
type CompanyCard = {
  companyName: string;
  city: string;
  province: string;
  country: string;
  positionTitle: string;
};

export const useJobPage = (jobID?: string) => {
  const { extensionData: jobs } = useExtensionsDataContext();
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
          /<\s*(?:table)[^>]*>|<\/\s*(?:table)\s*>/g,
          ""
        ) ?? "",
    },
    {
      title: "Job Responsibilities",
      text:
        job?.jobResponsibilities.replace(
          /<\s*(?:table)[^>]*>|<\/\s*(?:table)\s*>/g,
          ""
        ) ?? "",
    },
    {
      title: "Required Skills",
      text:
        job?.requiredSkills.replace(
          /<\s*(?:table)[^>]*>|<\/\s*(?:table)\s*>/g,
          ""
        ) ?? "",
    },
  ];
  const { isLoading: isTagsLoading } = useJobTagsContext();

  const companyInfo: CompanyCard = {
    companyName: job?.companyName ?? "",
    city: job?.city ?? "",
    province: job?.province ?? "",
    country: job?.country ?? "",
    positionTitle: job?.jobName ?? "",
  };

  useEffect(() => {
    if (jobInfo.length === 0 || !companyInfo.companyName || init) {
      return;
    }
    Requests.getCompanyInfo(companyInfo.companyName)
      .then((res: ICompanyClearbitData) => {
        setImageURL(res.logo ?? "/logo-empty.png");
        setCompanyURL(res.domain);
        setInit(true);
      })
      .catch((err: any) => {
        setImageURL("/logo-empty.png");
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
