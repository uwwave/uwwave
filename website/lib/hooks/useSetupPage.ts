import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { LocalStorageMetadataKeys } from "src/lib/extension/shared/userProfile";

export const useSetupPage = () => {
  const { extensionData, isDataReady, isLoading } = useExtensionsDataContext();
  const router = useRouter();
  const [stepState, setStepState] = useState(1);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    let step = 1;
    if (isDataReady) {
      step = 2;
    }
    if (extensionData && extensionData[LocalStorageMetadataKeys.SCRAPE_AT]) {
      step = 3;
    }
    // Update the query parameter and trigger a route change
    router.push({
      pathname: "/setup",
      query: { step },
    });
  }, [isLoading, isDataReady, extensionData]);

  useEffect(() => {
    // Function to handle the query parameter changes
    const handleQueryParamChange = (params: URLSearchParams) => {
      const step = params.get("step");
      if (step && parseInt(step)) {
        setStepState(parseInt(step));
      }
    };

    // Listen to route changes and handle initial query parameters
    handleQueryParamChange(new URLSearchParams(router.query as any));

    const handleRouteChangeComplete = (url: string) => {
      const params = new URLSearchParams(url.split("?")[1]);
      handleQueryParamChange(params);
    };

    // Subscribe to route changes
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Clean up event listener when the component unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return {
    step: stepState,
  };
};
