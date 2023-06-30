import { useState } from "react";

export const useJobsDataGrid = () => {
  const [pageSize, setPageSize] = useState(10);

  return {
    pageSize,
    setPageSize,
  };
};
