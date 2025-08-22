import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import NotFound from "./pages/NotFound";
import CharacterDetail from "./pages/CharactersDetail";
import Backgrounds from "./pages/Backgrounds";
import BackgroundDetail from "./pages/BackgroundDetail";
import Personas from "./pages/Personas";
import BottomNav from "./components/layout/BottomNav";
import TopNav from "./components/layout/TopNav";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/characters", element: <Characters /> },
  { path: "/characters/:charId", element: <CharacterDetail /> },
  { path: "/backgrounds/:writerId", element: <Backgrounds /> },
  { path: "/backgrounds/:bgId", element: <BackgroundDetail /> },
  { path: "/personas", element: <Personas /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-96 flex justify-center">
        <TopNav />
        <main
          className="w-full max-w-sm md:max-w-md lg:max-w-lg flex-1
                   mt-[3.375rem] mb-[3.5rem]
                   pl-safe-left pr-safe-right"
        >
          <RouterProvider router={router} />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

export default App;
