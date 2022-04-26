import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logOut = useCallback(async () => {
    await signOut();
    setIsLoggedIn(false);
    router.push("/");
  }, [router]);

  useEffect(() => {
    Session.doesSessionExist().then((b) => {
      setIsLoggedIn(b);
    });
  }, []);

  return { isLoggedIn, logOut };
}