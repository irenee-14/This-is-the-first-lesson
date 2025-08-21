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
    <div className="min-h-screen flex flex-col items-center relative">
      <TopNav />

      <div className="flex-1 w-96 flex justify-center mt-4 mb-16">
        <RouterProvider router={router} />
      </div>

      <BottomNav />
    </div>
  );
}

export default App;
