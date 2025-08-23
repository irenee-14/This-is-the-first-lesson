import SwitchSafe from "@/components/ui/SwitchSafe";

export default function TopNav() {
  return (
    <nav
      className="fixed top-0 left-1/2 -translate-x-1/2
                 w-full max-w-sm md:max-w-md lg:max-w-lg h-14
                 flex items-center justify-between px-4
                 bg-phone shadow-md z-50"
    >
      {/* 로고 */}
      <img src="/image/logo.svg" alt="logo" className="h-[1.125rem] w-auto" />

      {/* 오른쪽 스위치 */}
      <div className="flex items-center">
        <SwitchSafe />
      </div>
    </nav>
  );
}
