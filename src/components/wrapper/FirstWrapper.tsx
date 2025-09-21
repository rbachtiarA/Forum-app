import React, { ReactNode } from "react";

export default function FirstWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-4 md:px-64 py-1 grid grid-rows-[auto_auto_1fr]">
      {children}
    </div>
  );
}
