import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Characters from "@/pages/CharacterList";
import NotFound from "@/pages/NotFound";
import Personas from "@/pages/Personas";
import CharacterDetail from "@/pages/CharacterDetail";
import { useFlowReset } from "@/hooks/useFlowReset";
// import { useFlowStore } from "./stores/useFlowStore";
// import { useEffect } from "react";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
// import {
//   RequireBackgroundDetail,
//   RequirePersona,
//   RequireChat,
// } from "@/utils/RequireFlow";
import Chats from "@/pages/ChatList";
import MyPage from "@/pages/MyPage";
import Feed from "@/pages/FeedPage";
import StoryDetail from "@/pages/StoryDetail";
import Stories from "./pages/StoryList";
import { ToastProvider } from "@/components/ui/ToastProvider";
import ToastExample from "./components/ui/ToastExample";

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
      { path: "/", element: <Home /> },
      { path: "/characters", element: <Characters /> },
      { path: "/characters/:charId", element: <CharacterDetail /> },
      { path: "/stories", element: <Stories /> },
      {
        // element: <RequireBackgroundDetail />,
        children: [{ path: "/story/:storyId", element: <StoryDetail /> }],
      },
      {
        // element: <RequirePersona />,
        children: [{ path: "/personas/:storyId", element: <Personas /> }],
      },
      { path: "/chats", element: <Chats /> },
      { path: "/feed", element: <Feed /> },
      { path: "/mypage", element: <MyPage /> },
      {
        // element: <RequireChat />,
        children: [
          { path: "/chat/:chatId", element: <Chat /> },
          // { path: "/chat/:chatId", element: <ChatRoom /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// function DebugFlow() {
//   const state = useFlowStore();

//   useEffect(() => {
//     console.log("현재 Flow 상태:", state);
//   }, [state]);

//   return null;
// }

function App() {
  return (
    <main className="min-h-screen w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto flex-1 scrollbar-stable">
      <ToastProvider>
        {/* <DebugFlow /> */}
        <RouterProvider router={router} />
      </ToastProvider>
    </main>
  );
}

export default App;
