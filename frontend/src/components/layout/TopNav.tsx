import SwitchSafe from "@/components/ui/SwitchSafe";

export default function TopNav() {
  return (
    <nav className="w-96 h-14 flex items-center justify-between px-6 bg-phone text-White-Font shadow-md">
      {/* 로고 */}
      <div className="w-14 h-4 flex items-center">
        <img src="/image/logo.svg" alt="logo" className="h-10 w-auto" />
      </div>
      {/* 오른쪽 스위치 */}
      <div className="flex items-center">
        <SwitchSafe />
      </div>
    </nav>
  );
}
