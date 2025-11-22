import { useEffect, useState } from "react";

const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function useClock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const day = DAY_LABELS[now.getDay()];
      setTimeString(`${hours}:${minutes} // ${day}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const [time, day] = timeString.split("//").map((v) => v?.trim() ?? "");

  return { timeString, time, day };
}
