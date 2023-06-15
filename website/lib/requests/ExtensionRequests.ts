//TODO: replace and delete the stuff outside the method later
import { Color } from "src/styles/color";
import { ListenerId } from "src/lib/extension/listenerId";
import { RequestName } from "src/lib/extension/shared/dataBridge";
import { sendRequestToExtensionOrTimeout } from "src/lib/extension/extensionService";
import {
  ALL_TAGS_KEY,
  getJobTagStorageKey,
  TAG_DATA_IDENTIFIER,
} from "src/lib/extension/shared/tags";
import { v4 as uuidv4 } from "uuid";

// function delay(ms: number): Promise<void> {
//   return new Promise<void>(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// }

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

export interface ITagToJobs {
  [tag: string]: string[];
}

export interface ITagCount {
  [tag: string]: number;
}

export class ExtensionRequests {
  static async getAllTags(): Promise<AllTagsObject> {
    console.log("[Client] Getting all tags");
    // Use the timestamp to make it unique
    const request = {
      id: `${ListenerId.getSyncStorage}_${uuidv4()}`,
      reqName: RequestName.getSync,
      params: {
        getKey: ALL_TAGS_KEY,
      },
    };
    const result = await sendRequestToExtensionOrTimeout(request);
    if (result === undefined || result[ALL_TAGS_KEY] === undefined) {
      console.log("[Client] No tags exist; using dummy tags");
      await sendRequestToExtensionOrTimeout({
        id: `${ListenerId.setSyncStorage}_${uuidv4()}`,
        reqName: RequestName.setSync,
        params: {
          setObject: { [ALL_TAGS_KEY]: dummyTags },
        },
      });
      return dummyTags;
    }
    console.log(`[Client] Tags found: ${Object.keys(result[ALL_TAGS_KEY])}`);
    return result[ALL_TAGS_KEY];
  }

  static async getAllJobsToTags(): Promise<IJobToTags> {
    console.log("[Client] Getting all jobs to tags");
    // Use the timestamp to make it unique
    const result = await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.getSyncStorage}_${uuidv4()}`,
      reqName: RequestName.getSync,
    });
    if (result === undefined) {
      return {};
    }
    const jobsToTags = Object.fromEntries(
      Object.entries(result)
        .filter(([k]) => k.startsWith(TAG_DATA_IDENTIFIER))
        .map(([k, v]) => [k.substring(TAG_DATA_IDENTIFIER.length), v]) // need to strip the identifier for usage
    );
    console.log(
      `[Client] Tags found for ${Object.keys(jobsToTags).length} jobs`
    );
    return jobsToTags;
  }

  //Adds a tag to a jobID
  static async onSelectTag(jobID: string, label: string): Promise<undefined> {
    console.log(`[Client] Selected tag ${label} for job ${jobID}`);
    const key = getJobTagStorageKey(jobID);
    const result = await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.getSyncStorage}_${uuidv4()}`,
      reqName: RequestName.getSync,
      params: {
        getKey: key,
      },
    });
    let tags = [];
    if (result !== undefined && Array.isArray(result[key])) {
      tags = result[key];
      console.log(`[Client] Job ${jobID} has existing tags ${tags}`);
    }
    if (!tags.includes(label)) {
      tags.push(label);
      console.log(`[Client] Adding tag ${label} to ${jobID}`);
    }

    await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.setSyncStorage}_${uuidv4()}`,
      reqName: RequestName.setSync,
      params: {
        setObject: { [key]: tags },
      },
    });
    console.log(`[Client] Successfully selected tag ${label} to job ${jobID}`);
    return;
  }

  //Removes a tag from a jobID (tag still exists)
  static async onRemoveTag(jobID: string, label: string): Promise<undefined> {
    console.log(`[Client] Removing tag ${label} for job ${jobID}`);
    const key = getJobTagStorageKey(jobID);
    const result = await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.getSyncStorage}_${uuidv4()}`,
      reqName: RequestName.getSync,
      params: {
        getKey: key,
      },
    });
    if (result === undefined || !Array.isArray(result[key])) {
      console.log(`[Client] Job ${jobID} has no tags`);
      return;
    }
    const tags = result[key];
    const index = tags.indexOf(label);
    console.log(`[Client] Found tags ${tags} for job ${jobID}`);
    if (index > -1) {
      console.log(`[Client] Tag ${label} found. Removing...`);
      tags.splice(index, 1);
    }

    await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.setSyncStorage}_${uuidv4()}`,
      reqName: RequestName.setSync,
      params: {
        setObject: { [key]: tags },
      },
    });
    console.log(`[Client] Successfully removed tag ${label} from job ${jobID}`);
    return;
  }

  //Creates a new tag and adds that tag to the jobID
  static async createNewTagAndAddToJob(
    jobID: string,
    tag: ITag
  ): Promise<undefined> {
    console.log(`[Client] Adding new tag ${tag.label}`);
    const allTags = (await this.getAllTags()) as unknown as Record<
      string,
      ITagProps
    >;
    allTags[tag.label] = {
      color: tag.color,
    };
    await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.setSyncStorage}_${uuidv4()}`,
      reqName: RequestName.setSync,
      params: {
        setObject: { [ALL_TAGS_KEY]: allTags },
      },
    });
    console.log(`[Client] New tag ${tag.label} created`);

    await this.onSelectTag(jobID, tag.label);
    return;
  }

  // oldTagID is the label of the tag
  static async patchTag(oldTagID: string, newTag?: ITag): Promise<undefined> {
    console.log(
      `[Client] Removing tag ${oldTagID}.` +
        (newTag ? `Adding new tag ${newTag?.label}` : "")
    );

    const result = await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.getSyncStorage}_${uuidv4()}`,
      reqName: RequestName.getSync,
    });
    if (result === undefined) {
      console.error(`[Client] Sync storage undefined!`);
      return;
    }

    // delete old tag and add new tag to all tags dict
    const allTags = result[ALL_TAGS_KEY] as Record<string, ITagProps>;
    delete allTags[oldTagID];
    if (newTag) {
      allTags[newTag.label] = {
        color: newTag.color,
      };
    }
    console.log(`[Client] New all tags: ${Object.keys(allTags)}`);

    // delete all of oldTagID, and add newTagID
    const toUpdate = {} as Record<string, string[]>;
    for (const [key, value] of Object.entries(result)) {
      if (key.startsWith(TAG_DATA_IDENTIFIER)) {
        // value is a list of tags
        const index = value.indexOf(oldTagID);
        if (index > -1) {
          value.splice(index, 1);
          // only add new tag if it previously had the tag
          if (newTag && !value.includes(newTag.label)) {
            value.push(newTag.label);
          }
          toUpdate[key] = value;
        }
      }
    }
    console.log(
      `[Client] Removing/adding tags to jobs ${Object.keys(toUpdate)}`
    );

    await sendRequestToExtensionOrTimeout({
      id: `${ListenerId.setSyncStorage}_${uuidv4()}`,
      reqName: RequestName.setSync,
      params: {
        setObject: { [ALL_TAGS_KEY]: allTags, ...toUpdate },
      },
    });
    console.log("[Client] Done patching tag");
    return;
  }

  static async deleteTag(name: string): Promise<undefined> {
    await this.patchTag(name);
    return;
  }

  //TODO: optimize logic
  static async bulkDeleteTags(tags: string[]): Promise<undefined> {
    for (const tag of tags) {
      await this.patchTag(tag);
    }
    return;
  }
}
