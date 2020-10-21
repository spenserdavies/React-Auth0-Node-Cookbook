import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
console.log(domain);

ReactDOM.render(
  <Auth0Provider
    domain="spenserdavies.auth0.com"
    clientId="42rmQaPQ38SbaQ96OrFsLAD03TT3GaBe"
    redirectUri={window.location.origin}
  >
    <App />,
  </Auth0Provider>,

  document.getElementById("root")
);
