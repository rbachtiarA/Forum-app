import React from "react";

export default function FeedWrapper({ children }: React.PropsWithChildren) {
  return (
    // <div className="flex flex-col px-2 gap-y-2 mt-2 min-h-[720px]">
    <div className="grid grid-flow-row px-2 gap-y-2 mt-2 min-h-screen">
      {children}
    </div>
  );
}
