import React from "react";
import { useNavigate } from "react-router-dom";

const Characters: React.FC = () => {
  const navigate = useNavigate();

  const goToDetail = (id: string) => {
    navigate(`/characters/${id}`);
  };
  return (
    <div className="character-page">
      <h1>캐릭터 페이지</h1>
      <p>캐릭터에 대한 정보입니다.</p>
      <button onClick={() => goToDetail("1")}>
        캐릭터 1 상세 페이지로 이동
      </button>
    </div>
  );
};

export default Characters;
