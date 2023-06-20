import { useUserContext } from "../context/User/UserContext";
import { useModalState } from "./useModalState";

export const useAddReviewButton = () => {
  const { isLoggedIn } = useUserContext();
  const { isOpen, open, close } = useModalState();
  return {
    isLoggedIn,
    isOpen,
    open,
    close,
  };
};
