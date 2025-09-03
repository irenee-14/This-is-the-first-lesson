import type { Flow } from "@/types/story";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useBackgroundClickHandler() {
  const [lockedFlow, setLockedFlow] = useState<Flow | null>(null);
  const navigate = useNavigate();

  const handleClick = (flow?: Flow) => {
    if (!flow) return;
    if (flow.isOpen) {
      navigate(`/story/${flow.id}`);
    } else {
      setLockedFlow(flow);
    }
  };

  const closeSheet = () => setLockedFlow(null);

  return { handleClick, lockedFlow, closeSheet };
}
