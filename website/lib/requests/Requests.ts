import axios from "axios";
import { ICompanyDomain } from "src/database/models/CompanyDomains";

export interface IJobKeyword {
  jobID: string;
  keywords: string[];
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
  ): Promise<ICompanyDomain> {
    return axios
      .post(`/api/companyInfo`, { companyName, domain })
      .then(x => x.data);
  }

  static async getCompanyInfo(companyName: string): Promise<any> {
    return axios
      .get(`/api/companyInfo?companyName=${companyName}`)
      .then(x => x.data);
  }
}
