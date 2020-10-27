import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { domain, clientId } from "./authConfig";

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />,
  </Auth0Provider>,

  document.getElementById("root")
);
