import React, { ReactNode } from "react";

export default function FirstWrapper({ children }: { children: ReactNode }) {
  return <div className="w-full px-64 py-1">{children}</div>;
}
