import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import axios from "axios";
Session.addAxiosInterceptors(axios);

export default function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [accessTokenPayload, setAccessTokenPayload] = useState<any>(undefined);

  const logOut = useCallback(async () => {
    await signOut();
    setIsLoggedIn(false);
    router.push("/");
  }, [router]);

  useEffect(() => {
    Session.doesSessionExist().then((exists) => {
      if (exists) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Session.getUserId().then((userId) => {
        setUserId(userId);
      });
      Session.getAccessTokenPayloadSecurely().then((payload) => {
        setAccessTokenPayload(payload);
      });
    } else {
      setUserId(undefined);
      setAccessTokenPayload(undefined);
    }
  }, [isLoggedIn]);

  return { isLoggedIn, logOut, userId, accessTokenPayload };
}
