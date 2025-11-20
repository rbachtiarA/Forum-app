export default function PostSkeleton() {
  const className = {
    bgColor: "bg-secondary",
    fgColor: "bg-accent",
    parent:
      "animate-pulse w-full pt-6 pb-3 px-6 rounded-xl flex flex-col gap-2 justify-around",
    avatar: "w-[40px] h-[40px] rounded-full animate-pulse",
    header: "h-6 w-1/4 animate-pulse rounded-lg",
    content: "w-full h-4 animate-pulse rounded-lg",
    button: "h-8 w-12 animate-pulse rounded-lg",
  };
  return (
    <div className={`${className.parent} ${className.bgColor}`}>
      <div className="flex gap-2 items-center">
        <div className={`${className.avatar} ${className.fgColor}`} />
        <div className={`${className.header} ${className.fgColor}`} />
      </div>
      <div className={`${className.header} ${className.fgColor}`} />

      <div className="flex flex-col gap-1">
        <div className={`${className.content} ${className.fgColor}`} />
        <div className={`${className.content} ${className.fgColor}`} />
        <div className={`${className.content} ${className.fgColor}`} />
      </div>
      <div className="flex gap-2">
        <div className={`${className.button} ${className.fgColor}`} />
        <div className={`${className.button} ${className.fgColor}`} />
      </div>
    </div>
  );
}
