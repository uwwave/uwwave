import { useLoginModalContext } from "../context/LoginModal/LoginModalContext";
import { useUserContext } from "../context/User/UserContext";
import { useModalState } from "./useModalState";

export const useAddReviewButton = () => {
  const { isLoggedIn } = useUserContext();
  const { isOpen, open: openAddModal, close } = useModalState();
  const { open: openLogin } = useLoginModalContext();
  const open = () => {
    isLoggedIn ? openAddModal() : openLogin();
  };
  return {
    isOpen,
    open,
    close,
  };
};
