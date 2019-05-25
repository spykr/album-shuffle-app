import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import App from "scenes/App/App";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
    ${normalize}
    html, body {
        font-family: Roboto, sans-serif;
        height: 100%;
        width: 100%;
    }
`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
