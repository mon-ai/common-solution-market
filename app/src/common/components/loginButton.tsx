import { Button } from "antd";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

export default function LoginButton() {
  const { isLoggedIn, logOut } = useAuth();

  return isLoggedIn ? (
    <Button onClick={logOut}>Logout</Button>
  ) : (
    <Link href="/auth" passHref>
      <Button>Login</Button>
    </Link>
  );
}
