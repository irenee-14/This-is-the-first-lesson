import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import FloatingButton from "@/components/features/FloatingButton";
import BottomNav from "@/components/layout/BottomNav";
import OtherMessage from "@/components/features/OtherMessage";
import MyMessage from "@/components/features/MyMessage";
import IconButton from "@/components/ui/IconButton";
import MessageActions from "@/components/features/MessageActions";
import { ReactComponent as HeartIcon } from "@/assets/icons/Heart.svg";
import { ReactComponent as PlayIcon } from "@/assets/icons/Play.svg";
import { ReactComponent as PlusIcon } from "@/assets/icons/Plus.svg";

export default function ComponentDemo() {
  const [floatingButtonVariant, setFloatingButtonVariant] = useState<
    "chat" | "input"
  >("chat");
  const [headerVariant, setHeaderVariant] = useState<"default" | "withText">(
    "default"
  );

  const handleChatClick = () => {
    console.log("Chat button clicked!");
  };

  const handleInputSubmit = (value: string) => {
    console.log("Input submitted:", value);
  };

  return (
    <div className="min-h-screen bg-indigoGray-black text-white">
      {/* Header */}
      {headerVariant === "default" ? (
        <Header />
      ) : (
        <Header variant="withText" title="컴포넌트 데모" />
      )}

      {/* Main Content */}
      <div className="pt-14 pb-20 px-4">
        <div className="max-w-sm mx-auto space-y-8">
          <h1 className="text-2xl font-bold text-White-Font text-center">
            컴포넌트 데모
          </h1>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-White-Font">
              페이지 링크
            </h2>
            <div className="flex gap-2 flex-wrap">
              <Link
                to="/character-detail"
                className="px-4 py-2 bg-purple-600 text-White-Font rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                캐릭터 상세페이지
              </Link>
              <Link
                to="/chat"
                className="px-4 py-2 bg-purple-600 text-White-Font rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                채팅 페이지
              </Link>
            </div>
          </div>

          {/* Header Variants */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-White-Font">
              Header Variants
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setHeaderVariant("default")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  headerVariant === "default"
                    ? "bg-purple-600 text-White-Font"
                    : "bg-gray-950 text-gray-400 hover:text-White-Font"
                }`}
              >
                Default
              </button>
              <button
                onClick={() => setHeaderVariant("withText")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  headerVariant === "withText"
                    ? "bg-purple-600 text-White-Font"
                    : "bg-gray-950 text-gray-400 hover:text-White-Font"
                }`}
              >
                With Text
              </button>
            </div>
          </div>

          {/* Floating Button Variants */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-White-Font">
              Floating Button Variants
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFloatingButtonVariant("chat")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  floatingButtonVariant === "chat"
                    ? "bg-purple-600 text-White-Font"
                    : "bg-gray-950 text-gray-400 hover:text-White-Font"
                }`}
              >
                Chat Button
              </button>
              <button
                onClick={() => setFloatingButtonVariant("input")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  floatingButtonVariant === "input"
                    ? "bg-purple-600 text-White-Font"
                    : "bg-gray-950 text-gray-400 hover:text-White-Font"
                }`}
              >
                Chat Input
              </button>
            </div>
          </div>

          {/* Component Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-White-Font">
              Component Information
            </h2>
            <div className="bg-gray-950 rounded-lg p-4 space-y-3">
              <div>
                <h3 className="text-sm font-medium text-purple-400">
                  FloatingButton
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  A floating action button with two variants: chat button and
                  chat input field.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-purple-400">Header</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Enhanced header component with default and text variants,
                  supporting icons and safe switch.
                </p>
              </div>
            </div>
          </div>

          {/* Message Components */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-White-Font">
              메시지 컴포넌트
            </h2>
            <div className="bg-gray-950 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-purple-400 mb-3">
                  상대방 메시지 (OtherMessage)
                </h3>
                <OtherMessage
                  content={[
                    "첫 번째 일반 텍스트입니다.",
                    '"첫 번째 말풍선입니다."',
                    "두 번째 일반 텍스트입니다.",
                    '"두 번째 말풍선\n여러 줄로\n표시됩니다."',
                    "마지막 일반 텍스트입니다.",
                  ]}
                  characterName="AI 어시스턴트"
                  isLastMessage={true}
                  onReset={() => console.log("Reset clicked")}
                  onEdit={() => console.log("Edit clicked")}
                  onDelete={() => console.log("Delete clicked")}
                  onShare={() => console.log("Share clicked")}
                  onBookmark={() => console.log("Bookmark clicked")}
                />
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium text-purple-400 mb-3">
                  상대방 메시지 (마지막이 아닌 경우 - 2개 아이콘만)
                </h3>
                <OtherMessage
                  content={[
                    "이전 메시지입니다.",
                    '"마지막이 아니라서 아이콘이 2개만 보입니다."',
                  ]}
                  characterName="AI 어시스턴트"
                  isLastMessage={false}
                  onReset={() => console.log("Reset clicked")}
                  onEdit={() => console.log("Edit clicked")}
                  onDelete={() => console.log("Delete clicked")}
                  onShare={() => console.log("Share clicked")}
                  onBookmark={() => console.log("Bookmark clicked")}
                />
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium text-purple-400 mb-3">
                  내 메시지 (MyMessage)
                </h3>
                <MyMessage
                  content={[
                    "내가 보낸 첫 번째 일반 텍스트입니다.",
                    '"내가 보낸 첫 번째 말풍선입니다."',
                    '"여러 줄로 된\n내 말풍선도\n잘 표시됩니다."',
                    "마지막 일반 텍스트입니다.",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Icon Components */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-White-Font">
              아이콘 컴포넌트
            </h2>
            <div className="bg-gray-950 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-purple-400 mb-3">
                  개별 아이콘 버튼 (IconButton)
                </h3>
                <div className="flex items-center gap-2">
                  <IconButton
                    icon={<HeartIcon className="w-4 h-4" />}
                    onClick={() => console.log("Heart clicked")}
                    size="sm"
                    ariaLabel="좋아요"
                  />
                  <IconButton
                    icon={<PlayIcon className="w-4 h-4" />}
                    onClick={() => console.log("Play clicked")}
                    size="md"
                    variant="active"
                    ariaLabel="재생"
                  />
                  <IconButton
                    icon={<PlusIcon className="w-4 h-4" />}
                    onClick={() => console.log("Plus clicked")}
                    size="lg"
                    ariaLabel="추가"
                  />
                  <IconButton
                    icon={<HeartIcon className="w-4 h-4" />}
                    onClick={() => console.log("Disabled heart")}
                    disabled
                    ariaLabel="비활성화된 좋아요"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-purple-400 mb-3">
                  메시지 액션 그룹 (MessageActions)
                </h3>
                <MessageActions
                  onReset={() => console.log("Reset action")}
                  onEdit={() => console.log("Edit action")}
                  onDelete={() => console.log("Delete action")}
                  onShare={() => console.log("Share action")}
                  onBookmark={() => console.log("Bookmark action")}
                />
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-White-Font">
              Usage Examples
            </h2>
            <div className="bg-gray-950 rounded-lg p-4">
              <pre className="text-xs text-gray-400 overflow-x-auto">
                {`// OtherMessage with actions
<OtherMessage
  content={[
    "일반 텍스트입니다.",
    '"따옴표 안의 내용은 말풍선으로 표시됩니다."',
    "또 다른 일반 텍스트"
  ]}
  characterName="캐릭터명"
  profileImage="/path/to/image.jpg"
  onReset={() => console.log('Reset')}
  onEdit={() => console.log('Edit')}
  onDelete={() => console.log('Delete')}
  onShare={() => console.log('Share')}
  onBookmark={() => console.log('Bookmark')}
/>

// MyMessage
<MyMessage
  content={[
    "내가 보낸 일반 텍스트",
    '"내가 보낸 말풍선 메시지"',
    "순서는 상관없습니다"
  ]}
/>

// IconButton
<IconButton
  icon={<HeartIcon className="w-4 h-4" />}
  onClick={() => console.log('Heart clicked')}
  size="md"
  variant="active"
  ariaLabel="좋아요"
/>

// MessageActions
<MessageActions
  onReset={() => console.log('Reset')}
  onEdit={() => console.log('Edit')}
  onDelete={() => console.log('Delete')}
  onShare={() => console.log('Share')}
  onBookmark={() => console.log('Bookmark')}
/>

// FloatingButton
<FloatingButton
  variant="chat"
  onChatClick={() => console.log('Chat clicked')}
/>

// Header
<Header variant="default" showSafeSwitch={true} />

<Header
  variant="withText"
  title="페이지 제목"
  leftIcon={<ArrowLeftIcon />}
  rightIcon={<SearchIcon />}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <FloatingButton
        variant={floatingButtonVariant}
        onChatClick={handleChatClick}
        onInputSubmit={handleInputSubmit}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
