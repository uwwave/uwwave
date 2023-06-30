import { useState, useMemo } from "react";
import {
  buildCoopJobsListFromExtensionData,
  buildFulltimeJobsListFromExtensionData,
  buildCoopJobsFilterTagsFromExtensionData,
} from "src/lib/jobsList/jobsList";
import { sendMessageOnLoadAndSetupListenerHook } from "src/lib/extension/extensionService";
import { ListenerId } from "src/lib/extension/listenerId";
import { RequestName } from "src/lib/extension/shared/dataBridge";

export const useExtensionData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const [extensionData, setExtensionData] = useState<{ [key: string]: string }>(
    {}
  );
  const coopJobsListPageRows = useMemo(
    () => buildCoopJobsListFromExtensionData(extensionData),
    [extensionData]
  );
  const fulltimeJobsListPageRows = useMemo(
    () => buildFulltimeJobsListFromExtensionData(extensionData),
    [extensionData]
  );

  const coopJobsFilterTags = useMemo(
    () => buildCoopJobsFilterTagsFromExtensionData(extensionData),
    [extensionData]
  );

  const fetchExtensionData = () => {
    if (isDataReady) {
      setIsLoading(false);
      return;
    }
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    setIsLoading(true);
    sendMessageOnLoadAndSetupListenerHook(
      {
        id: ListenerId.allExtensionLocalStorage,
        reqName: RequestName.getLocal,
      },
      result => {
        console.info("Received callback to get extension data.");
        if (result) {
          setExtensionData(result);
          setIsDataReady(true);
          console.info("Successfully set extension data.");
        } else {
          console.warn(
            "Expected extension callback to return a result, but no result was returned"
          );
        }
        clearTimeout(timeout);
        setIsLoading(false);
      }
    );
  };

  return {
    isLoading,
    isDataReady,
    coopJobsListPageRows,
    fulltimeJobsListPageRows,
    extensionData,
    fetchExtensionData,
    coopJobsFilterTags,
  };
};
