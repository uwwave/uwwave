import { JOB_DATA_IDENTIFIERS } from "src/lib/extension/shared/job";
import { JobBoard } from "src/lib/extension/shared/jobBoard";
import {
  AppInfoFields,
  JobPostingCoop,
  JobPostingFulltime,
  JobInfoFieldsCoop,
  JobInfoFieldsFulltime,
  PostingSections,
} from "src/lib/extension/jobKeys";
import {
  JobFilterTags,
  durationToFilterTags,
  appDocsTextToFilterTag,
  specialReqsTextToFilterTag,
  lookupFilterTags,
  JobFilters,
} from "src/lib/extension/jobFilters";

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
  duration: string;
  jobPostingInformation: any;
  applicationInformation: any;
  ratingsScore: number | null;
  salaryScore: number | null;
  interviewScore: number | null;
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
        duration: "",
        industryTag: "",
        keywords: [],
        jobSummary: "",
        jobResponsibilities: "",
        requiredSkills: "",
        compensationAndBenefitsInformation: "",
        jobPostingInformation: null,
        applicationInformation: null,
        ratingsScore: null,
        salaryScore: null,
        interviewScore: null,
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

      jobList[job.jobId].applicationInformation =
        job.pageData[PostingSections.applicationInformation];
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
        duration: "",
        jobPostingInformation: null,
        applicationInformation: null,
        ratingsScore: null,
        salaryScore: null,
        interviewScore: null,
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

      jobList[job.jobId].applicationInformation =
        job.pageData[PostingSections.applicationDelivery];
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
  if (Object.keys(extensionData).length === 0 || jobInfo === undefined) {
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
    duration: "",
    jobPostingInformation: null,
    applicationInformation: null,
    ratingsScore: null,
    salaryScore: null,
    interviewScore: null,
  };
  const jobPostingInformation =
    jobInfo.pageData[PostingSections.jobPostingInformation];
  if (jobPostingInformation !== undefined) {
    job.city = jobPostingInformation[JobInfoFieldsCoop.jobCity];
    job.province = jobPostingInformation[JobInfoFieldsCoop.jobProvince];
    job.country = jobPostingInformation[JobInfoFieldsCoop.jobCountry];
    job.location = `${job.country}, ${job.city}`;
    job.duration = jobPostingInformation[JobInfoFieldsCoop.workTermDuration]
      .replace(" work term", "")
      .replace(" consecutive", "");
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

  job.applicationInformation =
    jobInfo.pageData[PostingSections.applicationInformation];
  return job;
}

export function buildCoopJobsFilterTagsFromExtensionData(
  extensionData: Record<string, any>
) {
  const jobListFilterTags: Record<number, JobFilterTags> = {};

  Object.entries(extensionData).forEach(pair => {
    const key = pair[0];
    if (key.startsWith(JOB_DATA_IDENTIFIERS[JobBoard.coop])) {
      const job: JobPostingCoop = pair[1];

      jobListFilterTags[job.jobId] = {
        [JobFilters.appDocFilter]: [],
        [JobFilters.durationFilter]: [],
        [JobFilters.specialReqFilter]: [],
      };

      const jobPostingInformation =
        job.pageData[PostingSections.jobPostingInformation];

      const applicationInformation =
        job.pageData[PostingSections.applicationInformation];

      if (applicationInformation !== undefined) {
        const appDocsText =
          applicationInformation[AppInfoFields.documentsRequired];
        if (appDocsText !== undefined) {
          jobListFilterTags[job.jobId][JobFilters.appDocFilter] =
            lookupFilterTags(appDocsText, appDocsTextToFilterTag);
        }

        const additionalText =
          applicationInformation[AppInfoFields.additionalInfo];
        if (additionalText !== undefined) {
          jobListFilterTags[job.jobId][JobFilters.specialReqFilter] =
            jobListFilterTags[job.jobId][JobFilters.specialReqFilter].concat(
              lookupFilterTags(additionalText, specialReqsTextToFilterTag)
            );

          // check for external application
          if (
            (additionalText.includes("https://") ||
              additionalText.includes("http://")) &&
            additionalText.toLowerCase().includes("apply")
          ) {
            jobListFilterTags[job.jobId][JobFilters.specialReqFilter].push(
              "External application"
            );
          }
        }
      }

      if (jobPostingInformation !== undefined) {
        const durationText =
          jobPostingInformation[JobInfoFieldsCoop.workTermDuration];
        if (durationText !== undefined) {
          jobListFilterTags[job.jobId][JobFilters.durationFilter] =
            durationToFilterTags(durationText);
        }

        const specialReqsText =
          jobPostingInformation[JobInfoFieldsCoop.specialJobRequirements];
        if (specialReqsText !== undefined) {
          jobListFilterTags[job.jobId][JobFilters.specialReqFilter] =
            jobListFilterTags[job.jobId][JobFilters.specialReqFilter].concat(
              lookupFilterTags(specialReqsText, specialReqsTextToFilterTag)
            );
        }
      }

      // dedupe special_reqs_tags
      jobListFilterTags[job.jobId][JobFilters.specialReqFilter] = Array.from(
        new Set(jobListFilterTags[job.jobId][JobFilters.specialReqFilter])
      );
    }
  });

  return jobListFilterTags;
}

export const getDifferentCountries = (jobs: JobsPageRowData[]) => {
  const out: { [country: string]: number } = {};
  jobs.forEach(job => {
    const country = job.country;
    if (!country) {
      return;
    }
    if (out[country]) {
      out[country]++;
    } else {
      out[country] = 1;
    }
  });
  return out;
};
