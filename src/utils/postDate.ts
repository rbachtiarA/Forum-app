export function postDateText(postTime: Date, currentTime: Date) {
  const diff = Math.floor((currentTime.getTime() - postTime.getTime()) / 1000);

  const oneMinute = 60;
  const oneHour = 60 * oneMinute;
  const oneDay = 24 * oneHour;
  const oneMonth = 30 * oneDay;
  if (diff < oneMinute) {
    return "just now";
  } else if (diff < oneHour) {
    const int = Math.floor(diff / oneMinute);
    return pluralTime(int, "min");
  } else if (diff < oneDay) {
    const int = Math.floor(diff / oneHour);
    return pluralTime(int, "hour");
  } else if (diff < oneMonth) {
    const int = Math.floor(diff / oneDay);
    return pluralTime(int, "day");
  } else {
    const date = new Date(postTime);
    return `${date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })}`;
  }
}

function pluralTime(int: number, text: "min" | "hour" | "day") {
  const indefinite = text === "hour" ? "an" : "a";
  const plural = int === 1 ? `${indefinite} ${text}` : `${int} ${text}s`;
  return plural + " ago";
}
