import axios from "axios";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IUserData } from "src/database/models/UserData";

export interface IJobKeyword {
  jobID: string;
  keywords: string[];
}

export interface IGetCompanyLogosResponse {
  companyNameToLogo: { [key: string]: string | undefined };
}

export interface IJobKeywordObject {
  jobs: { [key: string]: string[] };
}

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
    companyName: string,
    domain: string
  ): Promise<ICompanyClearbitData> {
    return axios
      .post(`/api/companyInfo`, { companyName, domain })
      .then(x => x.data);
  }

  static async getCompanyInfo(
    companyName: string
  ): Promise<ICompanyClearbitData> {
    return axios
      .get(`/api/companyInfo?companyName=${companyName}`)
      .then(x => x.data);
  }

  static async getCompanyLogos(): Promise<IGetCompanyLogosResponse> {
    return axios.get(`/api/companyInfo/logos`).then(x => x.data);
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
}
