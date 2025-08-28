import { useState, useRef, useEffect } from "react";
import { ReactComponent as DownIcon } from "@/assets/icons/Arrow-Down.svg";
interface DropdownProps {
  label: string; // 상단 Label
  buttonlabel: string; // 버튼 초기 텍스트
  items: string[]; // Dropdown 항목들
  value?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  buttonlabel,
  items,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? buttonlabel);
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

  useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  return (
    <div className="inline-flex flex-col justify-start items-start gap-1">
      {/* Label + Button */}
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <div className="self-stretch justify-start text-sm font-medium">
          {label}
        </div>

        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <div className="relative w-full">
            <div
              ref={buttonRef}
              onClick={() => setIsOpen((prev) => !prev)}
              className="self-stretch pl-4 pr-2  h-10 bg-indigoGray-black rounded-lg border border-gray-500 inline-flex justify-center items-center gap-2.5 cursor-pointer w-full"
            >
              <div
                className={`flex-1 justify-start text-sm font-normal leading-tight ${
                  !selected || selected === buttonlabel
                    ? "text-gray-500"
                    : "text-white"
                }`}
              >
                {selected && selected !== "" ? selected : buttonlabel}
              </div>
              <DownIcon className="h-5 w-5 text-white" />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                ref={dropdownRef}
                className="w-full p-2 bg-indigoGray-black rounded-lg outline outline-1 outline-offset-[-0.50px] outline-gray-500 inline-flex flex-col justify-start items-start gap-1 z-[100] absolute left-0 top-12"
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                      onChange?.(item);
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
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
