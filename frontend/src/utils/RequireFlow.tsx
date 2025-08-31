// src/components/RequireFlow.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useFlowStore } from "@/stores/useFlowStore";
import { useUserStore } from "@/stores/useUserStore";

export function RequireBackgroundDetail() {
  // const user = useUserStore();
  // const { backgroundId } = useFlowStore();

  // 유저가 해당 background 해금했는지 체크
  // const unlocked = user.unlockedBackgrounds.includes(backgroundId!);

  // if (!unlocked) {
  //   return <Navigate to="/backgrounds" replace />;
  // }

  return <Outlet />;
}

// Persona 접근 가드
export function RequirePersona() {
  const user = useUserStore();
  const { characterId, backgroundId } = useFlowStore();

  if (!user.userId) {
    return <Navigate to="/" replace />; // 로그인 필요
  }

  if (!characterId || !backgroundId) {
    return <Navigate to="/characters" replace />; // 선택 안 됨 → 캐릭터 선택부터
  }

  return <Outlet />;
}

// Chat 접근 가드
export function RequireChat() {
  // const { chats } = useFlowStore(); // 유저 세션에 있는 채팅들

  // const user = useUserStore();

  // if (!chatId || !chats.some((c) => c.id === chatId)) {
  //   return <Navigate to="/chat" replace />;
  // }
  const user = useUserStore();
  if (!user.userId) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
