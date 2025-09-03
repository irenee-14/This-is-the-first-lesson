import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

import { ReactComponent as NavigationIcon } from "@/assets/icons/Navigation.svg";
import { ReactComponent as CircleIcon } from "@/assets/icons/Circle.svg";
import { ReactComponent as FeedIcon } from "@/assets/icons/feed.svg";
import { ReactComponent as MenuIcon } from "@/assets/icons/Menu.svg";

const navItems = [
  { key: "chat", label: "진행중인 챗", icon: NavigationIcon },
  { key: "characters", label: "캐릭터 둘러보기", icon: CircleIcon },
  { key: "feed", label: "피드 둘러보기", icon: FeedIcon },
  { key: "mypage", label: "My Page", icon: MenuIcon },
];

export default function BottomNav() {
  const [selected, setSelected] = useState("characters");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (key: string) => {
    setSelected(key);
    switch (key) {
      case "chat":
        navigate("/chats");
        break;
      case "characters":
        navigate("/characters");
        break;
      case "feed":
        navigate("/feed");
        break;
      case "mypage":
        navigate("/mypage");
        break;
      default:
        break;
    }
  };

  // 현재 경로에 따라 활성화된 탭 설정
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.startsWith("/chats") || pathname.startsWith("/chat/")) {
      setSelected("chat");
    } else if (pathname.startsWith("/characters")) {
      setSelected("characters");
    } else if (pathname.startsWith("/feed")) {
      setSelected("feed");
    } else if (pathname.startsWith("/mypage")) {
      setSelected("mypage");
    }
  }, [location.pathname]);

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2
                 w-full max-w-sm md:max-w-md lg:max-w-lg h-14 px-4 pt-2
                 bg-phone border-t border-primary
                 inline-flex justify-between items-start gap-5
                 overflow-hidden z-50"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = selected === item.key;

        return (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.key)}
            className="inline-flex flex-col justify-start items-center gap-0.5"
          >
            {/* 아이콘 wrapper */}
            <div className="h-5 flex items-center justify-center">
              <Icon
                className={cn(
                  "h-full w-auto transition-colors duration-200 ",
                  isActive ? "text-purple-500" : "text-indigoGray-400"
                )}
                strokeWidth={isActive ? 2 : 1.5}
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
