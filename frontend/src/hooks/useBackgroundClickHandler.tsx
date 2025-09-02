import type { Background } from "@/types/background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useBackgroundClickHandler() {
  const [lockedBackground, setLockedBackground] = useState<Background | null>(
    null
  );
  const navigate = useNavigate();

  const handleClick = (background: Background) => {
    if (background.isOpened) {
      navigate(`/backgrounds/${background.backgroundId}`);
    } else {
      setLockedBackground(background);
    }
  };

  const closeSheet = () => setLockedBackground(null);

  return { handleClick, lockedBackground, closeSheet };
}
