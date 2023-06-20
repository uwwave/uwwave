import { useState } from "react";

export const useAddReviewModal = () => {
  const [error] = useState(false);

  return {
    error,
  };
};
