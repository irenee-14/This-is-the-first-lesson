import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToAbout = (): void => {
    navigate("/character");
  };

  return (
    <div className="home-page">
      <h1>홈 페이지</h1>
      <p>메인 페이지입니다.</p>
      <button onClick={handleNavigateToAbout}>캐릭터 페이지로 이동</button>
    </div>
  );
};

export default Home;
