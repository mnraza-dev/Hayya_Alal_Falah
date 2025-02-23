// hooks/useCurrentPrayer.js
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const useCurrentPrayer = (prayerTimes) => {
  const [currentPrayer, setCurrentPrayer] = useState(null);

  useEffect(() => {
    const checkCurrentPrayer = () => {
      const now = dayjs();
      const prayer = prayerTimes.find((p) => {
        const startTime = dayjs(`${dayjs().format("YYYY-MM-DD")}T${p.start}`);
        const endTime = dayjs(`${dayjs().format("YYYY-MM-DD")}T${p.end}`);
        return now.isAfter(startTime) && now.isBefore(endTime);
      });
      setCurrentPrayer(prayer ? prayer.name : null);
    };

    checkCurrentPrayer();
    const interval = setInterval(checkCurrentPrayer, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return currentPrayer;
};

export default useCurrentPrayer;
