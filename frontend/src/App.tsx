import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Characters from "./pages/Characters";
import NotFound from "./pages/NotFound";
import Backgrounds from "./pages/Backgrounds";
import BackgroundDetail from "./pages/BackgroundDetail";
import Personas from "./pages/Personas";
import ComponentDemo from "./pages/ComponentDemo";
import CharacterDetailPage from "./pages/CharacterDetailPage";

const router = createBrowserRouter([
  // { path: "/", element: <Home /> },
  { path: "/", element: <Characters /> },
  { path: "/characters", element: <Characters /> },
  { path: "/characters/:charId", element: <CharacterDetailPage /> },
  { path: "/backgrounds/:writerId", element: <Backgrounds /> },
  { path: "/backgrounds/:bgId", element: <BackgroundDetail /> },
  { path: "/personas", element: <Personas /> },
  { path: "/demo", element: <ComponentDemo /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <main className="min-h-screen w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto flex-1">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
