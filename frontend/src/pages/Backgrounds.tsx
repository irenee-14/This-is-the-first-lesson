import React from "react";
import { useNavigate } from "react-router-dom";

const Backgrounds: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const charId = urlParams.get("charId");

  const navigate = useNavigate();

  const goToDetail = (bgId: string) => {
    navigate(`/backgrounds/${bgId}?charId=${charId}`);
  };

  return (
    <div className="background-page">
      <h1>배경 페이지</h1>
      <p>배경에 대한 정보입니다.</p>
      <button onClick={() => goToDetail("1")}>배경 상세 페이지로 이동</button>
    </div>
  );
};

export default Backgrounds;
