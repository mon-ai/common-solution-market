import "../styles/globals.css";
import type { AppProps } from "next/app";

import Session from 'supertokens-auth-react/recipe/session';
import SuperTokensReact from "supertokens-auth-react";
import { frontendConfig } from "../config/frontendConfig";
import { redirectToAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function doRefresh() {
      // pageProps.fromSupertokens === 'needs-refresh' will be true
      // when in getServerSideProps, getSession throws a TRY_REFRESH_TOKEN
      // error.

      if (pageProps.fromSupertokens === "needs-refresh") {
        if (await Session.attemptRefreshingSession()) {
          // post session refreshing, we reload the page. This will
          // send the new access token to the server, and then
          // getServerSideProps will succeed
          location.reload();
        } else {
          // the user's session has expired. So we redirect
          // them to the login page
          redirectToAuth();
        }
      }
    }
    doRefresh();
  }, [pageProps.fromSupertokens]);

  if (pageProps.fromSupertokens === "needs-refresh") {
    // in case the frontend needs to refresh, we show nothing.
    // Alternatively, you can show a spinner.

    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
