import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import NotFound from "./pages/NotFound";
import CharacterDetail from "./pages/CharactersDetail";
import Backgrounds from "./pages/Backgrounds";
import BackgroundDetail from "./pages/BackgroundDetail";
import Personas from "./pages/Personas";

function App() {
  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">Hello Tailwind!</h1>
        <button className="mt-4 px-4 py-2 rounded-md bg-secondary text-white hover:bg-orange-600">
          버튼 예시
        </button>
      </div>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 로그인 추가, login상태가 아니면 로그인 페이지로 이동 */}
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:charId" element={<CharacterDetail />} />
            <Route path="/backgrounds/:writerId" element={<Backgrounds />} />
            <Route path="/backgrounds/:bgId" element={<BackgroundDetail />} />
            {/* charID=${charId} 쿼리 추가 되면 다음 버튼 표시, 아니면 정보만 */}
            <Route path="/personas" element={<Personas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
