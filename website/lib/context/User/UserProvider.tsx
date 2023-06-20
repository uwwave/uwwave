import React from "react";
import { UserContextType, UserContext } from "src/lib/context/User/UserContext";
import { useSession } from "next-auth/react";

interface IProvider {
  children: React.ReactNode;
}

interface ISession {
  id: string;
  username: string;
}

export const UserProvider = ({ children }: IProvider) => {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const user = session?.user as ISession | undefined;
  const value: UserContextType = {
    isLoading: loading,
    isLoggedIn: status === "authenticated",
    user: user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
