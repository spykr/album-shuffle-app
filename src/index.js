import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import App from "scenes/App/App";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  html {
    background-color: rgba(0, 0, 0, 0.9);
  }

  html, body, #root {
    font-family: Open Sans, sans-serif;
    height: 100%;
    min-width: 320px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  body {
    position: fixed;
  }

  button {
    text-shadow: inherit;
  }
`;

ReactDOM.render(
  <Router>
    <GlobalStyle />
    <App />
  </Router>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
