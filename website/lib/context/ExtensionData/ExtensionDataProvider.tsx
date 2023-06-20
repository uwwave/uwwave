import moment from "moment";
import React, { useMemo } from "react";
import {
  ExtensionDataContextType,
  ExtensionDataContext,
} from "src/lib/context/ExtensionData/ExtensionDataContext";
import { getTimeDiffString } from "src/lib/dates/dates";
import { useExtensionData } from "src/lib/extension/hooks/useExtensionData";
import {
  DAYS_TO_STALE_DATA,
  LocalStorageMetadataKeys,
} from "src/lib/extension/shared/userProfile";

interface IJobsTagsProvider {
  children: React.ReactNode;
}

export const ExtensionDataProvider = ({ children }: IJobsTagsProvider) => {
  const {
    isDataReady,
    coopJobsListPageRows,
    fulltimeJobsListPageRows,
    extensionData,
    fetchExtensionData,
    isLoading,
  } = useExtensionData();
  const dateScraped = extensionData[LocalStorageMetadataKeys.SCRAPE_AT];
  const dataAgeMessage = useMemo(() => {
    return getTimeDiffString(dateScraped);
  }, [dateScraped]);

  const isStale = useMemo(() => {
    return moment()
      .utc()
      .subtract(DAYS_TO_STALE_DATA, "day")
      .isAfter(dateScraped);
  }, [dateScraped]);

  const value: ExtensionDataContextType = {
    isStale,
    dataAgeMessage,
    isDataReady,
    coopJobsListPageRows,
    fulltimeJobsListPageRows,
    extensionData,
    fetchExtensionData,
    isLoading,
  };

  return (
    <ExtensionDataContext.Provider value={value}>
      {children}
    </ExtensionDataContext.Provider>
  );
};
