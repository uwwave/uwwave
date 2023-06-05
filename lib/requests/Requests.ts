import axios from "axios";

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
      .get(`/api/keywords?jobIDs=${JSON.stringify(jobIDs)}`)
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
}
