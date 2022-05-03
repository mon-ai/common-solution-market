import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

document.documentElement.setAttribute('data-color-mode', 'light')
hydrateRoot(document, <RemixBrowser />);
