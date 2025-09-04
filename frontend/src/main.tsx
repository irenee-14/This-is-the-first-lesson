import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "./styles/globals.css";
import { initializeScrollbarWidth } from "./utils/scrollbarUtils";

// 스크롤바 너비 초기화
initializeScrollbarWidth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
