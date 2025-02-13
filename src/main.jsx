import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DisplayGame from "./memorygame.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DisplayGame />
    {/* <App /> */}
  </StrictMode>
);
