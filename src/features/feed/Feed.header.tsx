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
      className="p-1"
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
    <div className="flex w-full py-4 px-2">
      <span className="w-fit font-black text-lg">Feeds</span>
      <div className="flex w-full justify-end items-center space-x-4">
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
  );
}
