import { useState, useEffect, useMemo } from "react";
import {
  buildCoopJobsListFromExtensionData,
  buildFulltimeJobsListFromExtensionData,
} from "src/lib/jobsList/jobsList";
import { sendMessageOnLoadAndSetupListenerHook } from "src/lib/extension/extensionService";
import { ListenerId } from "src/lib/extension/listenerId";
import { RequestName } from "src/lib/extension/shared/dataBridge";

export const useExtensionData = () => {
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

  useEffect(() => {
    const listener = sendMessageOnLoadAndSetupListenerHook(
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
      }
    );

    return () => {
      // Clean up the listener if necessary
      // For example, if sendMessageOnLoadAndSetupListenerHook returns a function to remove the listener
      listener();
    };
  }, []);

  return {
    isDataReady,
    coopJobsListPageRows,
    fulltimeJobsListPageRows,
    extensionData,
  };
};
