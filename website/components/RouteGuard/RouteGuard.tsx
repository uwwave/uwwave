import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "src/lib/context/User/UserContext";

interface IGuard {
  admin?: boolean;
  children: React.ReactNode;
}
export const RouteGuard = (props: IGuard) => {
  const router = useRouter();
  const { isLoading, user } = useUserContext();
  const [stateLoading, setStateLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!user?.isAdmin && props.admin) {
      router.push("/");
      return;
    }
    setStateLoading(false);
  }, [isLoading, user]);

  return <>{!stateLoading ? props.children : null}</>;
};
