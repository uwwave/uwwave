//TODO: replace and delete the stuff outside the method later
import { Color } from "src/styles/color";

function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const dummyTags: AllTagsObject = {
  Ambitious: {
    color: Color.ambitious,
  },
  Possible: {
    color: Color.possible,
  },
  Safe: {
    color: Color.safe,
  },
};

//TODO: End of code to remove
//Tag labels are unique, so we can use as an ID
interface ITagProps {
  color: string;
}

export interface ITag extends ITagProps {
  label: string;
}

export interface AllTagsObject {
  [label: string]: ITagProps;
}

export interface IJobToTags {
  [jobID: string]: string[];
}
export class ExtensionRequests {
  static async getAllTags(): Promise<AllTagsObject> {
    await delay(500);
    return dummyTags;
  }

  static async getAllJobsToTags(): Promise<IJobToTags> {
    await delay(500);
    return { "311699": ["Ambitious"] };
  }

  //Adds a tag to a jobID
  static async onSelectTag(jobID: string, tag: string): Promise<undefined> {
    await delay(500);
    console.log(jobID, tag);
    return;
  }

  //Removes a tag from a jobID (tag still exists)
  static async onRemoveTag(jobID: string, label: string): Promise<undefined> {
    await delay(500);
    console.log(jobID, label);
    return;
  }

  //Creates a new tag and adds that tag to the jobID
  static async createNewTagAndAddToJob(
    jobID: string,
    tag: ITag
  ): Promise<undefined> {
    console.log(jobID, tag);
    await delay(500);
    return;
  }

  static async patchTag(oldTagID: string, newTag: ITag): Promise<undefined> {
    console.log(oldTagID, newTag);
    await delay(500);
    return;
  }

  static async deleteTag(name: string): Promise<undefined> {
    console.log(name);
    await delay(500);
    return;
  }
}
