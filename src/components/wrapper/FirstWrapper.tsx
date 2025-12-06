import React, { ReactNode } from "react";

export default function FirstWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-2 md:px-6 lg:px-10 xl:px-14 py-1 md:grid md:grid-cols-[1fr_4fr_1fr]">
      {children}
    </div>
  );
}
