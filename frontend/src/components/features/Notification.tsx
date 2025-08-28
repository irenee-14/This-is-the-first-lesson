import { ReactComponent as HeartIcon } from "@/assets/icons/Heart.svg";

export default function Notification({ content }: { content: string }) {
  return (
    <>
      <div
        className="w-full p-4 bg-violet-600/10 rounded-lg
                      outline outline-1 outline-offset-[-1px] outline-purple-600
                      inline-flex justify-start items-start gap-2"
      >
        <div className="w-5 h-5 relative overflow-hidden ">
          <HeartIcon />
        </div>
        <div className="flex-1 justify-start text-Font-White-Font text-sm font-normal font-['Pretendard'] leading-tight">
          {content}
        </div>
      </div>
    </>
  );
}
