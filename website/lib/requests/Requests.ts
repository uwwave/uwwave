import axios from "axios";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IInterviewReview } from "src/database/models/InterviewReview";
import { IJobReview } from "src/database/models/JobReview";
import { IJobRole } from "src/database/models/JobRole";
import { IUserData } from "src/database/models/UserData";
import { IReviewsSummary } from "../types/reviews";

export interface IJobKeyword {
  jobID: string;
  keywords: string[];
}

export interface IUserReviews {
  jobReviews: number;
  interviewReviews: number;
}

export interface IJobRoles {
  jobID: string;
  roles: string[];
}

export interface IJobRecommendations {
  jobID: string;
  jobRecommendations: string[];
}

export interface IJobTechnologies {
  jobID: string;
  technologies: string[];
}

export interface IMetricGoals {
  accountsCreated?: number;
  extensionInstallations?: number;
  startingAccountsCreated?: number;
  startingExtensionInstallations?: number;
  jobReviews?: number;
  startingJobReviews?: number;
  interviewReviews?: number;
  startingInterviewReviews?: number;
}

export interface ICompanyData {
  logo?: string;
  salaryScore?: number | null;
  interviewAverage?: number | null;
  ratingAverage?: number | null;
}

export interface ICompanyJobReviewData {
  [company: string]: {
    salaryScore: number;
    ratingAverage: number;
  };
}

export interface ICompanyInterviewReviewData {
  [company: string]: {
    interviewAverage: number;
  };
}

export interface IGetCompaniesDataResponse {
  companyToData: { [key: string]: ICompanyData };
}

export interface IJobKeywordObject {
  jobs: { [key: string]: string[] };
}

type IPostJobReviewRequest = Omit<
  Omit<Omit<Omit<Omit<IJobReview, "id">, "user">, "date">, "upvoters">,
  "downvoters"
>;

type IPostInterviewReviewRequest = Omit<
  Omit<Omit<Omit<Omit<IInterviewReview, "id">, "user">, "date">, "upvoters">,
  "downvoters"
>;

export class Requests {
  static async getJobKeywords(
    jobIDs: string[] = []
  ): Promise<IJobKeywordObject> {
    return axios
      .post(`/api/keywords/fetch`, {
        jobIDs,
      })
      .then(x => x.data);
  }

  static async updateJobKeywords(
    jobKeywords: IJobKeyword[],
    adminPassword: string
  ): Promise<IJobKeywordObject> {
    return axios
      .post("/api/keywords", { jobKeywords, password: adminPassword })
      .then(x => x.data);
  }

  static async isAdmin(token: string): Promise<boolean> {
    return axios
      .get(`/api/checkadminaccess?token=${token}`)
      .then(x => x.data.isAdmin);
  }

  static async addCompanyDomain(
    domain: string,
    companyName?: string
  ): Promise<ICompanyClearbitData> {
    return axios
      .post(`/api/companyInfo`, { companyName, domain })
      .then(x => x.data);
  }

  static async getCompanyInfo(
    companyName: string
  ): Promise<ICompanyClearbitData> {
    return axios
      .get(`/api/companyInfo?companyName=${encodeURIComponent(companyName)}`)
      .then(x => x.data);
  }

  static async getCompanyInfoByID(
    companyID: string
  ): Promise<ICompanyClearbitData> {
    return axios.get(`/api/companyInfo?id=${companyID}`).then(x => x.data);
  }

  static async getCompaniesData(
    companyNames: string[]
  ): Promise<IGetCompaniesDataResponse> {
    return axios
      .post(`/api/companyInfo/companies/summaryData`, { companyNames })
      .then(x => x.data);
  }

  static async createAccount(
    email: string,
    username: string,
    password: string
  ): Promise<IUserData | undefined> {
    return axios
      .post("/api/createAccount", { email, username, password })
      .then(x => x.data);
  }

  static async getUser(id: string): Promise<IUserData> {
    return axios.get(`/api/user?id=${id}`).then(x => x.data);
  }

  static async postNewCompanies(companyNames: string[]): Promise<undefined> {
    return axios
      .post("/api/companyInfo/companies", { companies: companyNames })
      .then(x => x.data);
  }

  static async queryCompanies(
    company: string
  ): Promise<ICompanyClearbitData[]> {
    return axios
      .get(`/api/companyInfo/query?company=${company}`)
      .then(x => x.data);
  }

  static async queryJobRoles(query: string): Promise<IJobRole[]> {
    return axios.get(`/api/jobRole/query?query=${query}`).then(x => x.data);
  }

  static async addJobRoles(roles: string[]): Promise<undefined> {
    return axios.post("/api/jobRole", { roles }).then(x => x.data);
  }
  static async postJobReview(
    jobReview: IPostJobReviewRequest
  ): Promise<undefined> {
    return axios.post("/api/review/job", { ...jobReview }).then(x => x.data);
  }
  static async patchJobReview(
    reviewID: string,
    jobReview: IPostJobReviewRequest
  ): Promise<undefined> {
    return axios
      .patch("/api/review/job", { ...jobReview, id: reviewID })
      .then(x => x.data);
  }

  static async deleteJobReview(reviewID: string): Promise<undefined> {
    return axios.delete(`/api/review/job?id=${reviewID}`).then(x => x.data);
  }

  static async getJobReviews(companyID: string): Promise<IJobReview[]> {
    return axios
      .get(`/api/review/job?companyID=${companyID}`)
      .then(x => x.data);
  }

  static async getUserJobReviews(userID: string): Promise<IJobReview[]> {
    return axios.get(`/api/review/job?userID=${userID}`).then(x => x.data);
  }

  static async updateReviewVotes(
    upvotedReviews: string[],
    downvotedReviews: string[]
  ): Promise<undefined> {
    return axios
      .post(`/api/review/job/vote`, { upvotedReviews, downvotedReviews })
      .then(x => x.data);
  }

  static async postInterviewReview(
    jobReview: IPostInterviewReviewRequest
  ): Promise<undefined> {
    return axios
      .post("/api/review/interview", { ...jobReview })
      .then(x => x.data);
  }

  static async patchInterviewReview(
    reviewID: string,
    jobReview: IPostInterviewReviewRequest
  ): Promise<undefined> {
    return axios
      .patch("/api/review/interview", { ...jobReview, id: reviewID })
      .then(x => x.data);
  }

  static async deleteInterviewReview(reviewID: string): Promise<undefined> {
    return axios
      .delete(`/api/review/interview?id=${reviewID}`)
      .then(x => x.data);
  }

  static async getInterviewReviews(
    companyID: string
  ): Promise<IInterviewReview[]> {
    return axios
      .get(`/api/review/interview?companyID=${companyID}`)
      .then(x => x.data);
  }

  static async getUserInterviewReviews(
    userID: string
  ): Promise<IInterviewReview[]> {
    return axios
      .get(`/api/review/interview?userID=${userID}`)
      .then(x => x.data);
  }

  static async updateInterviewReviewVotes(
    upvotedReviews: string[],
    downvotedReviews: string[]
  ): Promise<undefined> {
    return axios
      .post(`/api/review/interview/vote`, { upvotedReviews, downvotedReviews })
      .then(x => x.data);
  }

  static async getCompanyReviewsSummary(
    companyID: string
  ): Promise<IReviewsSummary> {
    return axios
      .get(`/api/companyInfo/reviewSummary?id=${companyID}`)
      .then(x => x.data);
  }

  static patchProfilePhoto = async (photo: string): Promise<undefined> => {
    return axios
      .patch(`/api/account/profilePhoto`, { photo })
      .then(x => x.data);
  };

  static patchUsername = async (username: string): Promise<undefined> => {
    return axios.patch(`/api/account/username`, { username }).then(x => x.data);
  };

  static getJobRecommendations = async (jobID: string): Promise<string[]> => {
    return axios
      .get(`/api/jobRecommendations/fetch?jobID=${jobID}`)
      .then(x => x.data);
  };

  static getUserAccountsCreated = async (): Promise<number> => {
    return axios.get(`/api/admin/metrics/accountsCreated`).then(x => x.data);
  };

  static getExtensionInstalls = async (): Promise<number> => {
    return axios.get(`/api/admin/metrics/extensionInstalls`).then(x => x.data);
  };

  static getUserReviews = async (): Promise<IUserReviews> => {
    return axios.get(`/api/admin/metrics/userReviews`).then(x => x.data);
  };

  static getMetricGoals = async (): Promise<IMetricGoals> => {
    return axios.get(`/api/admin/metrics/goals`).then(x => x.data);
  };
}
