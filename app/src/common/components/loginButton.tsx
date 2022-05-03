import { Button } from "antd";
import { redirectToAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

interface Props {
  isLoggedIn: boolean;
  logOut: () => void;
}

async function login() {
  redirectToAuth();
}

export default function LoginButton(props: Props) {
  return props.isLoggedIn ? (
    <Button onClick={props.logOut}>Logout</Button>
  ) : (
    <Button onClick={login}>Login</Button>
  );
}
