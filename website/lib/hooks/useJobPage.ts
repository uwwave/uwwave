import { useEffect, useState } from "react";
import { buildCoopJobWithJobID } from "../jobsList/jobsList";
import { useExtensionData } from "../extension/hooks/useExtensionData";
import { extractTechFromText } from "../genTechStack/genTechStack";
import { Requests } from "../requests/Requests";
import { ExtensionRequests, ITag } from "src/lib/requests/ExtensionRequests";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";

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
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [tagsToSelect, setTagsToSelect] = useState<ITag[]>([]);
  const [gotInitTags, setGotInitTags] = useState<boolean>(false);
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

  useEffect(() => {
    const fire = async () => {
      if (!jobID || gotInitTags) {
        return;
      }
      const tagsSelected = await ExtensionRequests.getSelectedTags(
        jobID as unknown as number
      );
      const allTags = await ExtensionRequests.getAllTags();
      const filteredTags = allTags.filter(
        otherTag =>
          !tagsSelected.some(
            selectedTag => selectedTag.label === otherTag.label
          )
      );
      setTagsToSelect(filteredTags);
      setSelectedTags(tagsSelected);
      setGotInitTags(true);
    };
    fire();
  }, [jobID]);

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
    !gotInitTags;

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
    selectedTags,
    tagsToSelect,
  };
};
