import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Characters from "@/pages/CharacterList";
import NotFound from "@/pages/NotFound";
import Personas from "@/pages/Personas";
import CharacterDetail from "@/pages/CharacterDetail";
import { useFlowReset } from "@/hooks/useFlowReset";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Chats from "@/pages/ChatList";
import MyPage from "@/pages/MyPage";
import Feed from "@/pages/FeedPage";
import StoryDetail from "@/pages/StoryDetail";
import Stories from "./pages/StoryList";
import { ToastProvider } from "@/components/ui/ToastProvider";

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
      { path: "/story/:storyId", element: <StoryDetail /> },
      { path: "/personas/:storyId", element: <Personas /> },
      { path: "/chats", element: <Chats /> },
      { path: "/feed", element: <Feed /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/chat/:chatId", element: <Chat /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <main className="relative min-h-screen w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto flex-1 scrollbar-stable">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </main>
  );
}

export default App;
