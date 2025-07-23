"use client";

import React from "react";
import { useColorContext } from "@/contexts/ColorContext";

export default function X4Page() {
  // const [isHovering, setIsHovering] = useState(false);
  const { setIsDarkImage } = useColorContext();

  // Set dark image to true for transparent header with white text
  React.useEffect(() => {
    setIsDarkImage(true);

    return () => {
      setIsDarkImage(false);
    };
  }, [setIsDarkImage]);

  return (
    <div
      className="min-h-screen"
      style={{
        // background: isHovering ? 'black' : 'transparent',
        transition: "background 0.5s ease",
      }}
    >
      {/* Empty container - content will be added later */}
      <div className="min-h-screen flex items-center justify-center">
        {/* This is just a placeholder - remove when adding actual content */}
        <p className={` text-2xl hover:text-white text-black`}>
          Insta360 X4 Page Content Coming Soon
        </p>
      </div>
    </div>
  );
}
