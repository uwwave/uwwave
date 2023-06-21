import axios from "axios";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { IJobRole } from "src/database/models/JobRole";
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
      .get(`/api/companyInfo?companyName=${encodeURIComponent(companyName)}`)
      .then(x => x.data);
  }

  static async getCompanyInfoByID(
    companyID: string
  ): Promise<ICompanyClearbitData> {
    return axios.get(`/api/companyInfo?id=${companyID}`).then(x => x.data);
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
}
