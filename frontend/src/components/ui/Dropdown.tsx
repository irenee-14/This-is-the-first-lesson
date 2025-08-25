import { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
  label: string; // 상단 Label
  buttonLabel: string; // 버튼 초기 텍스트
  items: string[]; // Dropdown 항목들
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  buttonLabel,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(buttonLabel);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 Dropdown 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="inline-flex flex-col justify-start items-start gap-1">
      {/* Label + Button */}
      <div className="w-80 flex flex-col justify-start items-start gap-3">
        <div className="self-stretch justify-start text-white text-sm font-medium">
          {label}
        </div>

        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <div
            ref={buttonRef}
            onClick={() => setIsOpen((prev) => !prev)}
            className="self-stretch p-2 bg-indigoGray-black rounded-lg  border border-gray-500 inline-flex justify-center items-center gap-2.5 cursor-pointer"
          >
            <div
              className={`flex-1 justify-start text-sm font-normal leading-tight ${
                selected === buttonLabel ? "text-gray-500" : "text-white"
              }`}
            >
              {selected}
            </div>
            <div className="flex items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox=" 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 5.354a.5.5 0 0 1 .708 0L8 10.293l5.646-4.939a.5.5 0 1 1 .708.708l-6 5.5a.5.5 0 0 1-.708 0l-6-5.5a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="w-80 p-2 bg-indigoGray-black rounded-lg outline outline-1 outline-offset-[-0.50px] outline-gray-500 inline-flex flex-col justify-start items-start gap-1"
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
              className="self-stretch p-2 bg-indigoGray-black rounded-lg inline-flex justify-center items-center gap-2.5 cursor-pointer hover:bg-gray-950"
            >
              <div className="flex-1 justify-start text-gray-500 text-sm font-normal font-[Pretendard] leading-tight">
                {item}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
