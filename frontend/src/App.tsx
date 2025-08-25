import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Characters from "@/pages/Characters";
import NotFound from "@/pages/NotFound";
import Backgrounds from "@/pages/Backgrounds";
import BackgroundDetail from "@/pages/BackgroundDetail";
import Personas from "@/pages/Personas";
import CharacterDetailPage from "@/pages/CharacterDetailPage";
import { useFlowReset } from "@/hooks/useFlowReset";
import { useFlowStore } from "./stores/useFlowStore";
import { useEffect } from "react";

function FlowResetWrapper({ children }: { children: React.ReactNode }) {
  useFlowReset();
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    element: (
      <FlowResetWrapper>
        <Outlet />
      </FlowResetWrapper>
    ),
    children: [
      { path: "/", element: <Characters /> },
      { path: "/characters", element: <Characters /> },
      { path: "/characters/:charId", element: <CharacterDetailPage /> },
      { path: "/backgrounds", element: <Backgrounds /> },
      { path: "/backgrounds/:bgId", element: <BackgroundDetail /> },
      { path: "/personas", element: <Personas /> }, // flow 진입
      // { path: "/chat", element: <Chat /> }, // flow 진행
      // { path: "/chat/:chatId", element: <ChatRoom /> }, // 특정 채팅방
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function DebugFlow() {
  const state = useFlowStore();

  useEffect(() => {
    console.log("현재 Flow 상태:", state);
  }, [state]);

  return null;
}

function App() {
  return (
    <main className="min-h-screen w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto flex-1">
      <DebugFlow />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
