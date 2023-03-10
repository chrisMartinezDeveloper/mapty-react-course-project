import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Controller from "./components/Controller";
import "./css/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Controller />
  </StrictMode>
);
