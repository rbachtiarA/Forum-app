import React from "react";

function ButtonItem({
  label,
  value,
  option,
  setOption,
}: {
  label: string;
  value: "recent" | "friend" | "popular";
  option: "recent" | "friend" | "popular";
  setOption: (val: "recent" | "friend" | "popular") => void;
}) {
  const isActive = value === option;
  return (
    <button
      className={`px-4 pt-4 pb-2 rounded-t-2xl from-0% to-40% w-[100px] ${
        isActive
          ? "bg-gradient-to-t from-secondary to-transparent"
          : "hover:bg-gradient-to-t hover:from-secondary/90 hover:to-transparent"
      }`}
      onClick={() => setOption(value)}
      disabled={isActive}
    >
      <span className={`${isActive ? "font-semibold" : ""}`}>{label}</span>
    </button>
  );
}
export default function FeedHeader({
  option,
  setOption,
}: {
  option: "recent" | "friend" | "popular";
  setOption: (val: "recent" | "friend" | "popular") => void;
}) {
  return (
    <div className="sticky top-0 backdrop-blur-sm z-[3]">
      <div className="flex w-full items-center px-2 border-b-2">
        <span className="w-fit font-black text-lg">Feeds</span>
        <div className="flex w-full justify-end items-center">
          <ButtonItem
            value="recent"
            option={option}
            setOption={setOption}
            label="Recent"
          />
          <ButtonItem
            value="friend"
            option={option}
            setOption={setOption}
            label="Friend"
          />
          <ButtonItem
            value="popular"
            option={option}
            setOption={setOption}
            label="Trending"
          />
        </div>
      </div>
    </div>
  );
}
