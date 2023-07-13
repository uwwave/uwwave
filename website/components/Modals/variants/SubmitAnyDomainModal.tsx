import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
import { BaseModal } from "../BaseModal";
import { SubmitDomainInput } from "src/components/SubmitDomainInput/SubmitDomainInput";

interface ISubmitAnyDomainModal {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (company: ICompanyClearbitData) => void;
}
export const SubmitAnyDomainModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ISubmitAnyDomainModal) => {
  return (
    <BaseModal
      open={isOpen}
      hasCloseX
      onCloseModal={onClose}
      dark
      maxWidth="xs"
    >
      <SubmitDomainInput onSuccess={onSuccess} />
    </BaseModal>
  );
};
