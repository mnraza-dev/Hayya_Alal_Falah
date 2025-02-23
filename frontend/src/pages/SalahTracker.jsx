import { useState, useMemo } from "react";
import dayjs from "dayjs";
import useSalahRecords from "../hooks/useSalahRecords";
import useCurrentPrayer from "../hooks/useCurrentPrayer";
import axios from "../api/axiosInstance";
import DayNavigation from "../components/DayNavigation";
import SalahConfirmation from "../components/SalahConfirmation";
import SalahRecordsList from "../components/SalahRecordsList";


const SalahTracker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const salahRecords = useSalahRecords(selectedDate);

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
  const handleStatusChange = async (prayerName, newStatus) => {
    try {
      // Send a PUT request to the backend to update the Salah record status
      await axios.put("/salah_tracker/api/salah/update_status/", {
        prayer_name: prayerName,
        status: newStatus,
        date: selectedDate,
      });

      // Update the Salah record in local state without duplication
      setSalahRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.prayer_name === prayerName
            ? { ...record, status: newStatus } // Update the status of the existing record
            : record // Keep other records unchanged
        )
      );
    } catch (error) {
      console.error("Error updating Salah record:", error);
    }
  };

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

  const handleConfirmPrayer = async () => {
    if (currentPrayer) {
      const currentStatus = salahRecords.find(
        (record) => record.prayer_name === currentPrayer
      )?.status;
  
      const newStatus = currentStatus === "completed" ? "missing" : "completed"; // Toggle between completed and missing
  
      try {
        // Make a PUT request to update the Salah record status on the backend
        await axios.put("/salah_tracker/api/salah/update_status/", {
          prayer_name: currentPrayer,
          status: newStatus,
          date: selectedDate,
        });
  
        // Update the Salah record in local state without duplication
        setSalahRecords((prevRecords) => {
          return prevRecords.map((record) =>
            record.prayer_name === currentPrayer
              ? { ...record, status: newStatus } // Update the status of the existing record
              : record // Keep other records unchanged
          );
        });
      } catch (error) {
        console.error("Error updating Salah record:", error);
      }
    }
  };
  
  

  return (
    <div className="min-h-screen bg-black text-gold font-sans p-6 flex flex-col items-center relative">
      <h2 className="text-3xl font-arabic font-bold mb-6">Salah Tracker</h2>
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
            handleConfirmPrayer={handleConfirmPrayer}
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
