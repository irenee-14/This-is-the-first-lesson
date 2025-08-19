import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToAbout = (): void => {
    navigate("/characters");
  };

  return (
    <div className="home-page">
      <h1>홈 페이지</h1>
      <p>메인 페이지입니다.</p>
      <button onClick={handleNavigateToAbout}>캐릭터 페이지로 이동</button>
      <Button size="s" variant="primary">
        작은 버튼
      </Button>

      <Button size="m" variant="secondary">
        중간 버튼
      </Button>

      <Button size="l" variant="tertiary" disabled>
        큰 비활성 버튼
      </Button>
      <button className="btn-base btn-s btn-primary">기본 버튼</button>
    </div>
  );
};

export default Home;
