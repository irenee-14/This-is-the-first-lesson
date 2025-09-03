import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default function Chats() {
  return (
    <>
      <Header />

      <div className="pt-14 pb-20 flex flex-col items-center justify-center min-h-screen">
        <h2 className="h-40 text-xl font-bold">채팅 목록 페이지</h2>
      </div>
      <BottomNav />
    </>
  );
}
