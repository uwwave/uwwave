import { useState, useEffect } from "react";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";
import { ExtensionRequests } from "src/lib/requests/ExtensionRequests";

export const useBookmarkedPage = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobsPageRowData[]>([]);

  const onToggleBookmark = async (jobID: number) => {
    await ExtensionRequests.onBookmarkJob(jobID);
    const out = await ExtensionRequests.getBookmarkedJobs();
    setJobs(out);
  };

  useEffect(() => {
    const fire = async () => {
      const out = await ExtensionRequests.getBookmarkedJobs();
      setJobs(out);
      setLoading(false);
    };
    fire();
  });

  return { loading, jobs, onToggleBookmark };
};
