import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Requests } from "src/lib/requests/Requests";

export function withAdminAccess(WrappedComponent: React.FC) {
  const WithAdminAccess: React.FC = props => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Retrieve the token from the query parameter
      const { token } = router.query;

      if (!token) {
        return;
      }
      // Check admin access using the reusable function
      Requests.isAdmin(token as string)
        .then(isAdmin => {
          if (!isAdmin) {
            router.push("/");
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error checking admin access:", error);
        });
    }, [router.query]);

    return loading ? null : <WrappedComponent {...props} />;
  };

  return WithAdminAccess;
}
