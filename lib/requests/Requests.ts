import axios from "axios";

export interface IJobKeyword {
  jobID: string;
  keywords: string[];
}

export class Requests {
  static async getJobKeywords(): Promise<IJobKeyword[]> {
    return axios.get("/api/keywords").then(x => x.data);
  }

  static async updateJobKeywords(
    jobKeywords: IJobKeyword[],
    adminPassword: string
  ): Promise<IJobKeyword[]> {
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
