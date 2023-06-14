import React from "react";
import {
  ExtensionDataContextType,
  ExtensionDataContext,
} from "src/lib/context/ExtensionData/ExtensionDataContext";
import { useExtensionData } from "src/lib/extension/hooks/useExtensionData";

interface IJobsTagsProvider {
  children: React.ReactNode;
}

export const ExtensionDataProvider = ({ children }: IJobsTagsProvider) => {
  const {
    isDataReady,
    coopJobsListPageRows,
    fulltimeJobsListPageRows,
    extensionData,
  } = useExtensionData();

  const value: ExtensionDataContextType = {
    isDataReady,
    coopJobsListPageRows,
    fulltimeJobsListPageRows,
    extensionData,
  };

  return (
    <ExtensionDataContext.Provider value={value}>
      {children}
    </ExtensionDataContext.Provider>
  );
};
