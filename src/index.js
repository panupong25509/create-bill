import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";

const AppWithRouter = () => (
  <BrowserRouter>
    <Navbar />
    <App />
  </BrowserRouter>
);
ReactDOM.render(<AppWithRouter />, document.getElementById("root"));
