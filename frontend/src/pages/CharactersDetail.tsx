import React from "react";
import { useNavigate } from "react-router-dom";
import DetailHeader from "@/components/layout/DetailHeader";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";

const CharacterDetail: React.FC = () => {
  const navigate = useNavigate();

  // url에서 id 가져오기
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const goToDetail = () => {
    navigate(`/backgrounds?charId=${id}`);
  };

  return (
    <>
      <Header variant="withText" title="캐릭터 상세" />

      <div className="pt-14 pb-20">
        <div className="bg-gray-900 p-4 h-44 mb-6">
          <h1 className="h-40 text-2xl font-bold">캐릭터 상세</h1>
        </div>

        <div className="p-3">
          <h2 className="text-lg font-semibold mb-4">캐릭터 ID: {id}</h2>

          <div className="mb-8">
            <p className=" mb-4">캐릭터에 대한 상세 정보입니다.</p>
            <button
              onClick={() => goToDetail()}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              배경 목록으로 이동
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
};

export default CharacterDetail;
