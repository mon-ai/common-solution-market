// app/server/auth.server.ts
import { Authenticator } from "remix-auth";
import { GoogleStrategy, GitHubStrategy, SocialsProvider } from "remix-auth-socials";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator
export let authenticator = new Authenticator(sessionStorage, { sessionKey: '_session' });
// You may specify a <User> type which the strategies will return (this will be stored in the session)
// export let authenticator = new Authenticator<User>(sessionStorage, { sessionKey: '_session' });

authenticator.use(new GoogleStrategy(
  {
    clientID: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    callbackURL: `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`
  },
  async ({ profile }) => {
    // here you would find or create a user in your database
    return profile;
  }
));

authenticator.use(new GitHubStrategy(
  {
    clientID: "YOUR_CLIENT_ID",
    clientSecret: "YOUR_CLIENT_SECRET",
    callbackURL: `https://localhost:3333/auth/${SocialsProvider.FACEBOOK}/callback`
  },
  async ({ profile }) => {
    // here you would find or create a user in your database
    return profile;
  }
));