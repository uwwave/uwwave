import React, { useCallback, useEffect, useState } from "react";
import { UserContextType, UserContext } from "src/lib/context/User/UserContext";
import { useSession } from "next-auth/react";
import { Requests } from "src/lib/requests/Requests";
import { IUserData } from "src/database/models/UserData";

interface IProvider {
  children: React.ReactNode;
}

interface ISession {
  id: string;
  username: string;
}

export const UserProvider = ({ children }: IProvider) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<IUserData>();
  const [userRequestLoading, setUserRequsetLoading] = useState(true);

  const sessionLoading = status === "loading";
  const sessionUser = session?.user as ISession | undefined;

  const refetchUser = useCallback(async () => {
    if (!sessionUser) {
      return;
    }
    try {
      setUser(await Requests.getUser(sessionUser.id));
      setUserRequsetLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [sessionUser]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const isLoading = sessionLoading || (userRequestLoading && !!sessionUser);

  const value: UserContextType = {
    isLoading,
    isLoggedIn: status === "authenticated",
    user: user,
    refetchUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
