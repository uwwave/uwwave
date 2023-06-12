//TODO: replace and delete the stuff outside the method later
import { Color } from "src/styles/color";

function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const dummyTags: ITag[] = [
  {
    label: "Ambitious",
    color: Color.ambitious,
  },
  {
    label: "Possible",
    color: Color.possible,
  },
  {
    label: "Safe",
    color: Color.safe,
  },
];

//TODO: End of code to remove
//Tag labels are unique, so we can use as an ID
export interface ITag {
  color: string;
  label: string;
}
export class ExtensionRequests {
  static async getAllTags(): Promise<ITag[]> {
    await delay(500);
    return dummyTags;
  }

  //gets the selected tags of a certain jobid
  static async getSelectedTags(jobID: number): Promise<ITag[]> {
    console.log(jobID);
    await delay(500);
    return [...dummyTags.slice(0, 1)];
  }

  //Creates a new tag and adds that tag to the jobID
  static async createNewTagAndAddToJob(
    jobID: number,
    tag: ITag
  ): Promise<undefined> {
    console.log(jobID, tag);
    await delay(500);
    return;
  }

  static async patchTag(name: string, color: string): Promise<undefined> {
    console.log(name, color);
    await delay(500);
    return;
  }

  static async deleteTag(name: string): Promise<undefined> {
    console.log(name);
    await delay(500);
    return;
  }
}
