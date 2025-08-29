import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";

export default function MyPage() {
  return (
    <>
      <Header />

      <div className="pt-14 pb-20 flex flex-col items-center justify-center min-h-screen">
        <h2 className="h-40 text-xl font-bold">내 정보 페이지</h2>
      </div>
      <BottomNav />
    </>
  );
}
