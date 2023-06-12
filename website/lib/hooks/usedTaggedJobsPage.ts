import { useState } from "react";
import { JobsPageRowData } from "src/lib/jobsList/jobsList";

export const useTaggedJobsPage = () => {
  const [loading] = useState(true);
  const [jobs] = useState<JobsPageRowData[]>([]);

  return { loading, jobs };
};
