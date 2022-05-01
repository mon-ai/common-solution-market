import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/app.css";
import antd from "antd/dist/antd.variable.min.css";
import { useEffect } from "react";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: antd },
];

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("./mmon/proposals");}, []);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links /></head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload /></body></html>);}
