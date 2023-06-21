import { useEffect, useState } from "react";
import { Requests } from "src/lib/requests/Requests";
import { ICompanyClearbitData } from "src/database/models/CompanyDomains";
// import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";

export const useCompanyPage = (companyID?: string) => {
  //   const { extensionData: jobs } = useExtensionsDataContext();
  const [companyInfo, setCompanyInfo] = useState<ICompanyClearbitData>();
  const [infoModal, setInfoModal] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);

  const onClearbitData = (data: ICompanyClearbitData) => {
    setCompanyInfo(data);
  };

  useEffect(() => {
    const fire = async () => {
      if (!companyID) {
        return;
      }
      try {
        setCompanyInfo(await Requests.getCompanyInfoByID(companyID));
      } catch (e) {
        console.log(e);
      }
    };
    fire();
  }, [companyID]);

  const isLoading = !companyInfo;

  return {
    companyInfo,
    isLoading,
    infoModal,
    setInfoModal,
    onClearbitData,
    tabSelected,
    setTabSelected,
  };
};
