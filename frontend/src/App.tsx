import "./App.scss";
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
