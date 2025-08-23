import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Characters from "./pages/Characters";
import NotFound from "./pages/NotFound";
import CharacterDetail from "./pages/CharactersDetail";
import Backgrounds from "./pages/Backgrounds";
import BackgroundDetail from "./pages/BackgroundDetail";
import Personas from "./pages/Personas";
import BottomNav from "./components/layout/BottomNav";
import TopNav from "./components/layout/TopNav";

const router = createBrowserRouter([
  // { path: "/", element: <Home /> },
  { path: "/", element: <Characters /> },
  { path: "/characters", element: <Characters /> },
  { path: "/characters/:charId", element: <CharacterDetail /> },
  { path: "/backgrounds/:writerId", element: <Backgrounds /> },
  { path: "/backgrounds/:bgId", element: <BackgroundDetail /> },
  { path: "/personas", element: <Personas /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <div className="min-h-screen">
      <TopNav />

      <main className="w-full max-w-[360px] md:max-w-md lg:max-w-lg mx-auto flex-1 mt-14 mb-20">
        <RouterProvider router={router} />
      </main>

      <BottomNav />
    </div>
  );
}

export default App;
