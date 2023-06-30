import { createContext, useContext } from "react";
import { JobFilterTags } from "src/lib/extension/jobFilters";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";

export interface ExtensionDataContextType {
  isDataReady: boolean;
  coopJobsListPageRows: JobsPageRowData[];
  fulltimeJobsListPageRows: JobsPageRowData[];
  extensionData: { [key: string]: string };
  dataAgeMessage: string;
  isStale: boolean;
  isLoading: boolean;
  coopJobsFilterTags: Record<number, JobFilterTags>;
}

export const ExtensionDataContext = createContext<
  ExtensionDataContextType | undefined
>(undefined);

export const useExtensionsDataContext = () => {
  const extensionDataContext = useContext(ExtensionDataContext);
  if (!extensionDataContext) {
    throw new Error("ExtensionDataProvider not wrapped");
  }
  return extensionDataContext;
};
