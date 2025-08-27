import React, { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FloatingButton from "@/components/features/FloatingButton";
import Notification from "@/components/features/Notification";
import OtherMessage from "@/components/features/OtherMessage";
import MyMessage from "@/components/features/MyMessage";
import { useLocation } from "react-router-dom";

interface ChatMessage {
  id: string;
  type: "other" | "my" | "notification";
  content: string[];
  characterName?: string;
  profileImage?: string;
  timestamp?: string;
}

const ChatPage: React.FC = () => {
  const location = useLocation();
  const { character } = location.state || {};

  const [messages] = useState<ChatMessage[]>([
    {
      id: "2",
      type: "other",
      content: ['"사랑해, 사랑한다고" 어쩌고저쩌고외쳤다.'],
      characterName: "반지호",
      profileImage: "",
      timestamp: "[2025.08.13 (수) 11:59]",
    },
    {
      id: "3",
      type: "other",
      content: [
        '그것은 흡사 부활절날\n 여러 종류에서 일제히 울려오는 조악과도 같이\n즐겁고 경쾌한 소리였습니다. 우리 아가씨가 노새 등에 실린 버들고리 사이에 의젓이 올라타고 몸소 나타난 것입니다. 맑은 산 정기와, 소나기 뒤에 싸늘하게 씻긴 공기를 씌어 얼굴이 온통 발갛게 상기되어 있었습니다. 꼬마는 앓아 누워 있고, 노라드 아주머니는 휴가를 얻어 자기 아이들을 보러 갔다는 것이었습니다."text" 어쩌고저쩌고언제끝날까두둥탁',
      ],
      characterName: "반지호",
      profileImage: "",
    },
    {
      id: "4",
      type: "other",
      content: [
        '그것은 흡사 부활절날 여러 종류에서 일제히 울려오는 조악과도 같이 즐겁고 경쾌한 소리였습니다. 우리 아가씨가 노새 등에 실린 버들고리 사이에 의젓이 올라타고 몸소 나타난 것입니다. 맑은 산 정기와, 소나기 뒤에 싸늘하게 씻긴 공기를 씌어 얼굴이 온통 발갛게 상기되어 있었습니다. 꼬마는 앓아 누워 있고, 노라드 아주머니는 휴가를 얻어 자기 아이들을 보러 갔다는 것이었습니다. "text" ',
      ],
      characterName: "반지호",
      profileImage: "",
    },
    {
      id: "5",
      type: "notification",
      content: ["반지호가 기억을 불러왔어요"],
    },
    {
      id: "6",
      type: "other",
      content: [
        "그것은 흡사 부활절날",
        '여러 종류에서 일제히 울려오는 조악과도 같이 즐겁고 경쾌한 소리였습니다. 우리 아가씨가 노새 등에 실린 버들고리 사이에 의젓이 올라타고 몸소 나타난 것입니다. 맑은 산 정기와, 소나기 뒤에 싸늘하게 씻긴 공기를 씌어 얼굴이 온통 발갛게 상기되어 있었습니다. 꼬마는 앓아 누워 있고, 노라드 아주머니는 휴가를 얻어 자기 아이들을 보러 갔다는 것이었습니다."text"',
      ],
      characterName: "반지호",
      profileImage: "",
    },
    {
      id: "7",
      type: "my",
      content: [
        '맑은 산 정기와, 소나기 뒤에 싸늘하게 씻긴 공기를 느꼈다. "언제까지 그럴래?" 맑은 산 정기와, 소나기 뒤에 싸늘하게 씻긴 공기를 씌어 얼굴이 온통 발갛게 상기되어 있었습니다. 꼬마는 앓아 누워 있고, 노라드 아주머니는 휴가를 얻어 자기 아이들을 보러 갔다는 것이었습니다.',
      ],
    },
  ]);

  // 메시지 액션 핸들러들
  const handleReset = (messageId: string) => {
    console.log("Reset message:", messageId);
  };

  const handleEdit = (messageId: string) => {
    console.log("Edit message:", messageId);
  };

  const handleDelete = (messageId: string) => {
    console.log("Delete message:", messageId);
  };

  const handleShare = (messageId: string) => {
    console.log("Share message:", messageId);
  };

  const handleBookmark = (messageId: string) => {
    console.log("Bookmark message:", messageId);
  };

  const handleChatClick = () => {
    console.log("Chat button clicked");
    // 클릭하면 input에 "" 입력하기
  };

  const handleInputSubmit = (value: string) => {
    console.log("Input submitted:", value);
  };

  // 마지막 상대방 메시지인지 확인하는 함수
  const isLastOtherMessage = (currentIndex: number): boolean => {
    for (let i = currentIndex + 1; i < messages.length; i++) {
      if (messages[i].type === "other") {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[#12121d] text-white flex flex-col">
      {/* 헤더 */}
      <Header variant="withText" title={character.name} />

      {/* 채팅 컨텐츠 */}
      <div className="pt-14 pb-14">
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="max-w-full">
            {messages.map((message, index) => {
              switch (message.type) {
                case "notification":
                  return (
                    <div key={message.id} className="flex justify-center">
                      <div className="w-full p-4">
                        <Notification content={message.content[0]} />
                      </div>
                    </div>
                  );

                case "other":
                  return (
                    <div key={message.id} className="flex justify-start">
                      <OtherMessage
                        content={message.content}
                        characterName={character.name}
                        profileImage={message.profileImage}
                        isLastMessage={isLastOtherMessage(index)}
                        onReset={() => handleReset(message.id)}
                        onEdit={() => handleEdit(message.id)}
                        onDelete={() => handleDelete(message.id)}
                        onShare={() => handleShare(message.id)}
                        onBookmark={() => handleBookmark(message.id)}
                      />
                    </div>
                  );

                case "my":
                  return (
                    <div key={message.id} className="flex justify-end">
                      <MyMessage content={message.content} />
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
      {/* 플로팅 버튼 */}
      <FloatingButton
        variant="input"
        onChatClick={handleChatClick}
        onInputSubmit={handleInputSubmit}
        placeholder='"" 사이에 대사 지문을 넣어보세요.'
      />

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
};

export default ChatPage;
