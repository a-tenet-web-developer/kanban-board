import React from "react";
import ReactDOM from "react-dom/client"; // Use "react-dom/client" for React 18+
import "./styles/global.css"
import App from "./App"; // The main App component

// Create a root element and render the App
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
