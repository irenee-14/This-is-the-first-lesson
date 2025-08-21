import { useState } from "react";
import { cn } from "@/lib/utils";

import { ReactComponent as NavigationIcon } from "@/assets/icons/Navigation.svg";
import { ReactComponent as CircleIcon } from "@/assets/icons/Circle.svg";
import { ReactComponent as BookIcon } from "@/assets/icons/Book.svg";
import { ReactComponent as MenuIcon } from "@/assets/icons/Menu.svg";

const navItems = [
  { key: "chat", label: "진행중인 챗", icon: NavigationIcon },
  { key: "characters", label: "캐릭터 둘러보기", icon: CircleIcon },
  { key: "works", label: "작품 둘러보기", icon: BookIcon },
  { key: "mypage", label: "My Page", icon: MenuIcon },
];

export default function BottomNav() {
  const [selected, setSelected] = useState("characters");

  return (
    <nav className="w-96 h-14 fixed bottom-0 left-1/2 -translate-x-1/2 px-4 pt-2 bg-gray-950 border-t-[1.5px] border-primary inline-flex justify-center items-start gap-6 overflow-hidden z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = selected === item.key;

        return (
          <button
            key={item.key}
            onClick={() => setSelected(item.key)}
            className="inline-flex flex-col justify-start items-center gap-0.5"
          >
            {/* 아이콘 wrapper */}
            <div className="w-5 h-5 flex items-center justify-center">
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors duration-200 ",
                  isActive ? "text-purple-500" : "text-indigoGray-400"
                )}
                stroke-width={isActive ? 2 : 1.5}
              />
            </div>

            {/* 텍스트 */}
            <span
              className={cn(
                "text-xs font-pretendard text-center transition-colors duration-200",
                isActive
                  ? "text-White-Font font-semibold"
                  : "text-indigoGray-400 font-medium"
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
