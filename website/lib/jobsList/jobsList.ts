import { JOB_DATA_IDENTIFIERS } from "src/lib/extension/shared/job";
import { JobBoard } from "src/lib/extension/shared/jobBoard";
import {
  JobPostingCoop,
  JobPostingFulltime,
  JobInfoFieldsCoop,
  JobInfoFieldsFulltime,
  PostingSections,
} from "src/lib/extension/jobKeys";

export interface JobsPageRowData {
  id: number;
  jobName: string;
  companyName: string;
  division: string;
  city: string;
  province: string;
  country: string;
  industryTag: string;
  keywords: string[];
  openings: number;
  appDeadline: string;
  jobResponsibilities: string;
  jobSummary: string;
  requiredSkills: string;
  compensationAndBenefitsInformation: string;
  location: string;
  jobPostingInformation: any;
  ratingsScore: number;
  salaryScore: number;
  compatibilityScore: number;
}

export function buildCoopJobsListFromExtensionData(
  extensionData: Record<string, any>
) {
  const jobList: Record<number, JobsPageRowData> = {};
  Object.entries(extensionData).forEach(pair => {
    const key = pair[0];
    if (key.startsWith(JOB_DATA_IDENTIFIERS[JobBoard.coop])) {
      const job: JobPostingCoop = pair[1];

      jobList[job.jobId] = {
        id: job.jobId,
        companyName: job.postingListData.company,
        jobName: job.postingListData.jobTitle,
        appDeadline: job.postingListData.deadline,
        division: job.postingListData.division,
        openings: job.postingListData.openings,
        city: "",
        province: "",
        country: "",
        location: "",
        industryTag: "",
        keywords: [],
        jobSummary: "",
        jobResponsibilities: "",
        requiredSkills: "",
        compensationAndBenefitsInformation: "",
        jobPostingInformation: null,
        ratingsScore: Math.random() * 100,
        salaryScore: Math.random() * 100,
        compatibilityScore: Math.random() * 100,
      };

      const jobPostingInformation =
        job.pageData[PostingSections.jobPostingInformation];
      if (jobPostingInformation !== undefined) {
        jobList[job.jobId].city =
          jobPostingInformation[JobInfoFieldsCoop.jobCity];
        jobList[job.jobId].province =
          jobPostingInformation[JobInfoFieldsCoop.jobProvince];
        jobList[job.jobId].country =
          jobPostingInformation[JobInfoFieldsCoop.jobCountry];
        jobList[job.jobId].location = `${jobList[job.jobId].country}, ${
          jobList[job.jobId].city
        }`;
        jobList[job.jobId].jobSummary =
          jobPostingInformation[JobInfoFieldsCoop.jobSummary];
        jobList[job.jobId].jobResponsibilities =
          jobPostingInformation[JobInfoFieldsCoop.jobResponsibilities];
        jobList[job.jobId].requiredSkills =
          jobPostingInformation[JobInfoFieldsCoop.requiredSkills];
        jobList[job.jobId].compensationAndBenefitsInformation =
          jobPostingInformation[
            JobInfoFieldsCoop.compensationAndBenefitsInformation
          ] ?? "";
        jobList[job.jobId].jobPostingInformation = jobPostingInformation;
      }
    }
  });
  return Object.values(jobList);
}

export function buildFulltimeJobsListFromExtensionData(
  extensionData: Record<string, any>
) {
  const jobList: Record<number, JobsPageRowData> = {};
  Object.entries(extensionData).forEach(pair => {
    const key = pair[0];
    if (key.startsWith(JOB_DATA_IDENTIFIERS[JobBoard.fulltime])) {
      const job: JobPostingFulltime = pair[1];

      jobList[job.jobId] = {
        id: job.jobId,
        companyName: job.postingListData.company,
        jobName: job.postingListData.jobTitle,
        appDeadline: job.postingListData.deadline,
        division: job.postingListData.division,
        openings: NaN,
        city: job.postingListData.city,
        province: "",
        country: "",
        industryTag: "",
        keywords: [],
        jobSummary: "",
        jobResponsibilities: "",
        requiredSkills: "",
        compensationAndBenefitsInformation: "",
        location: "",
        jobPostingInformation: null,
        ratingsScore: Math.random() * 100,
        salaryScore: Math.random() * 100,
        compatibilityScore: Math.random() * 100,
      };

      const jobInfo = job.pageData[PostingSections.jobPostingInformation];
      if (jobInfo !== undefined) {
        const region = jobInfo[JobInfoFieldsFulltime.region];
        if (region) {
          jobList[job.jobId].country = region.split("-")[0].trim();
        }
        jobList[job.jobId].location = `${jobList[job.jobId].country}, ${
          jobList[job.jobId].city
        }`;
        jobList[job.jobId].jobSummary =
          jobInfo[JobInfoFieldsFulltime.jobSummary];
        jobList[job.jobId].jobResponsibilities =
          jobInfo[JobInfoFieldsFulltime.jobResponsibilities];
        jobList[job.jobId].requiredSkills =
          jobInfo[JobInfoFieldsFulltime.requiredSkills];
        jobList[job.jobId].compensationAndBenefitsInformation =
          jobInfo[JobInfoFieldsFulltime.compensationAndBenefits];
        jobList[job.jobId].jobPostingInformation = jobInfo;
      }
    }
  });
  return Object.values(jobList);
}

export function buildCoopJobWithJobID(
  extensionData: Record<string, any>,
  jobId: number
) {
  if (!jobId) {
    return null;
  }
  const jobInfo = extensionData[`coopJob_${jobId}`];
  if (Object.keys(extensionData).length === 0) {
    return null;
  }
  const job: JobsPageRowData = {
    id: jobId,
    companyName: jobInfo.postingListData.company,
    jobName: jobInfo.postingListData.jobTitle,
    appDeadline: jobInfo.postingListData.deadline,
    division: jobInfo.postingListData.division,
    openings: jobInfo.postingListData.openings,
    city: jobInfo.postingListData.city,
    province: jobInfo.postingListData.province,
    country: "",
    industryTag: "",
    keywords: [],
    jobSummary: "",
    jobResponsibilities: "",
    requiredSkills: "",
    compensationAndBenefitsInformation: "",
    location: "",
    jobPostingInformation: null,
    ratingsScore: Math.random() * 100,
    salaryScore: Math.random() * 100,
    compatibilityScore: Math.random() * 100,
  };
  const jobPostingInformation =
    jobInfo.pageData[PostingSections.jobPostingInformation];
  if (jobPostingInformation !== undefined) {
    job.city = jobPostingInformation[JobInfoFieldsCoop.jobCity];
    job.province = jobPostingInformation[JobInfoFieldsCoop.jobProvince];
    job.country = jobPostingInformation[JobInfoFieldsCoop.jobCountry];
    job.location = `${job.country}, ${job.city}`;
    job.jobSummary = jobPostingInformation[JobInfoFieldsCoop.jobSummary];
    job.jobResponsibilities =
      jobPostingInformation[JobInfoFieldsCoop.jobResponsibilities];
    job.requiredSkills =
      jobPostingInformation[JobInfoFieldsCoop.requiredSkills];
    job.compensationAndBenefitsInformation =
      jobPostingInformation[
        JobInfoFieldsCoop.compensationAndBenefitsInformation
      ] ?? "";
    job.jobPostingInformation = jobPostingInformation;
  }
  return job;
}
