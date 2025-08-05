import { useState, useMemo, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "../api/axiosInstance";
import dayjs from "dayjs";
import useSalahRecords from "../hooks/useSalahRecords";
import useCurrentPrayer from "../hooks/useCurrentPrayer";
import DayNavigation from "../components/DayNavigation";
import SalahConfirmation from "../components/SalahConfirmation";
import SalahRecordsList from "../components/SalahRecordsList";

const SalahTracker = () => {

  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [salahRecords, setSalahRecords] = useState([]);
  
  const prayerTimes = useMemo(
    () => [
      { name: "Fajr", start: "05:00", end: "06:30" },
      { name: "Dhuhr", start: "13:00", end: "16:30" },
      { name: "Asr", start: "16:45", end: "18:30" },
      { name: "Maghrib", start: "18:45", end: "19:45" },
      { name: "Isha", start: "20:00", end: "23:00" },
    ],
    []
  );

  useEffect(() => {
    const fetchSalahRecords = async () => {
      try {
        const response = await axios.get("/salah_tracker/api/salah/", {
          params: { date: selectedDate },
        });
        setSalahRecords(response.data);
      } catch (error) {
        console.error("Error fetching Salah records:", error);
      }
    };

    fetchSalahRecords();
  }, [selectedDate]);
  const currentPrayer = useCurrentPrayer(prayerTimes);

  const handlePrevDay = () => {
    setSelectedDate((prev) =>
      dayjs(prev).subtract(1, "day").format("YYYY-MM-DD")
    );
  };

  const handleNextDay = () => {
    if (selectedDate !== dayjs().format("YYYY-MM-DD")) {
      setSelectedDate((prev) => dayjs(prev).add(1, "day").format("YYYY-MM-DD"));
    }
  };

  const handleStatusChange = async (prayerName, newStatus) => {
    try {
      await axios.put("/salah_tracker/api/salah/update_status/", {
        prayer_name: prayerName,
        status: newStatus,
        date: selectedDate,
      });
  
      setSalahRecords((prevRecords) => {
        return prevRecords.map((record) =>
          record.prayer_name === prayerName
            ? { ...record, status: newStatus }
            : record
        );
      });
    } catch (error) {
      console.error("Error updating Salah record:", error);
    }
  };
  

  const handleConfirmPrayer = async () => {
    if (currentPrayer) {
      const currentStatus = salahRecords.find(
        (record) => record.prayer_name === currentPrayer
      )?.status;

      const newStatus = currentStatus === "completed" ? "missing" : "completed";

      try {
        await axios.put("/salah_tracker/api/salah/update_status/", {
          prayer_name: currentPrayer,
          status: newStatus,
          date: selectedDate,
        });

        setSalahRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.prayer_name === currentPrayer
              ? { ...record, status: newStatus }
              : record
          )
        );
      } catch (error) {
        console.error("Error updating Salah record:", error);
      }
    }
  };

  return (
    <div  className={`min-h-screen p-6 flex flex-col items-center transition-colors duration-300 bg-[#141E30] text-[#EDEDED]" : "bg-white text-black"
    }`}>
       <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Salah Tracker</h2>
       
      </div>
      <DayNavigation
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        selectedDate={selectedDate}
      />
      <div className="w-full max-w-2xl bg-black p-6 rounded-xl shadow-lg border border-gold text-center">
        <h3 className="text-2xl font-bold mb-4">
          {dayjs(selectedDate).format("DD MMMM YYYY")}
        </h3>
        {currentPrayer && (
         <SalahConfirmation
         currentPrayer={currentPrayer}
         currentStatus={salahRecords.find(record => record.prayer_name === currentPrayer)?.status || "missing"}
         handleStatusChange={handleStatusChange} 
         selectedDate={selectedDate} 
       />
        )}


        {salahRecords.length === 0 ? (
          <p className="text-center text-gold">No Salah records found for this day.</p>
        ) : (
          <SalahRecordsList salahRecords={salahRecords} handleStatusChange={handleStatusChange} />
        )}
      </div>
    </div>
  );
};

export default SalahTracker;
