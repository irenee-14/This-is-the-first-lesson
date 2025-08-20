import React from "react";
import { useNavigate } from "react-router-dom";

const CharacterDetail: React.FC = () => {
  const navigate = useNavigate();

  // url에서 id 가져오기
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const goToDetail = () => {
    navigate(`/backgrounds?charId=${id}`);
  };
  return (
    <div className="character-page">
      <h1>캐릭터 상세 페이지</h1>
      <p>캐릭터에 대한 정보입니다.</p>
      <button onClick={() => goToDetail()}>배경 목록으로 이동</button>
    </div>
  );
};

export default CharacterDetail;
