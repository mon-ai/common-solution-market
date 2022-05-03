import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css";
import antd from "antd/dist/antd.variable.min.css";
import codemirror from 'codemirror/lib/codemirror.css';

import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: antd },
  { rel: "stylesheet", href: codemirror },
];

export const CatchBoundary = ClerkCatchBoundary();

export function loader(args) {
  return rootAuthLoader(args);
}

function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);
