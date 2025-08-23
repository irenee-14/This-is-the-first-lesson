import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "@/assets/icons/Arrow-Left.svg";
import { ReactComponent as DotIcon } from "@/assets/icons/Dot.svg";

interface DetailHeaderProps {
  title: string;
  onBack?: () => void;
  onMenu?: () => void;
}

export default function DetailHeader({
  title,
  onBack,
  onMenu,
}: DetailHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleMenu = () => {
    if (onMenu) {
      onMenu();
    }
  };

  return (
    <nav
      className="fixed top-0 left-1/2 -translate-x-1/2
                 w-full max-w-sm md:max-w-md lg:max-w-lg h-14
                 flex items-center justify-between px-4
                 bg-phone shadow-md z-50"
    >
      {/* 뒤로가기 버튼과 제목 */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleBack}
          className="w-8 h-8 flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white tracking-tight">
          {title}
        </h1>
      </div>

      {/* 메뉴 버튼 */}
      <button
        onClick={handleMenu}
        className="w-8 h-8 flex items-center justify-center"
      >
        <DotIcon className="w-6 h-6 text-white" />
      </button>
    </nav>
  );
}
