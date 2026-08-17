import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppShell from "../components/AppShell";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-grid" />
    <div className="relative z-10">
      <AppShell>
        <App />
      </AppShell>
    </div>
  </React.StrictMode>,
);
