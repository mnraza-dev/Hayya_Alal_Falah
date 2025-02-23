import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const SalahTracker = () => {
  const [salahRecords, setSalahRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalahRecords = async () => {
      try {
        const response = await axios.get(`/salah_tracker/api/salah/?date=${selectedDate}`);
        setSalahRecords(response.data);
      } catch (error) {
        console.error("Error fetching Salah records:", error);
        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };
    fetchSalahRecords();
  }, [selectedDate]);

  useEffect(() => {
    const prayerTimes = [
      { name: "Fajr", start: "05:00", end: "06:30" },
      { name: "Dhuhr", start: "13:00", end: "16:30" },
      { name: "Asr", start: "16:45", end: "18:30" },
      { name: "Maghrib", start: "18:45", end: "19:45" },
      { name: "Isha", start: "20:00", end: "23:00" },
    ];

    const checkCurrentPrayer = () => {
      const now = dayjs();
      const prayer = prayerTimes.find(
        (p) => now.isAfter(dayjs(`${dayjs().format("YYYY-MM-DD")}T${p.start}`)) &&
               now.isBefore(dayjs(`${dayjs().format("YYYY-MM-DD")}T${p.end}`))
      );
      setCurrentPrayer(prayer ? prayer.name : null);
    };

    checkCurrentPrayer();
    const interval = setInterval(checkCurrentPrayer, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevDay = () => {
    setSelectedDate((prev) => dayjs(prev).subtract(1, "day").format("YYYY-MM-DD"));
  };

  const handleNextDay = () => {
    if (selectedDate !== dayjs().format("YYYY-MM-DD")) {
      setSelectedDate((prev) => dayjs(prev).add(1, "day").format("YYYY-MM-DD"));
    }
  };

  const handleConfirmPrayer = async () => {
    if (currentPrayer) {
      try {
        await axios.post("/salah_tracker/api/salah/", { prayer_name: currentPrayer, status: "completed", date: selectedDate });
        setSalahRecords([...salahRecords, { prayer_name: currentPrayer, status: "completed", date: selectedDate }]);
      } catch (error) {
        console.error("Error updating Salah record:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-gold font-sans p-6 flex flex-col items-center relative">
      <h2 className="text-3xl font-arabic font-bold mb-6">Salah Tracker</h2>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <button onClick={handlePrevDay} className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-80">← Prev Day</button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button onClick={handleNextDay} disabled={selectedDate === dayjs().format("YYYY-MM-DD")} className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-80 disabled:opacity-50">Next Day →</button>
      </div>
      <div className="w-full max-w-2xl bg-black p-6 rounded-xl shadow-lg border border-gold text-center">
        <h3 className="text-2xl font-bold mb-4">{dayjs(selectedDate).format("DD MMMM YYYY")}</h3>
        {currentPrayer && (
          <div className="mb-4 p-4 bg-gold text-black rounded-lg">
            <p className="text-lg  font-bold">Did you pray {currentPrayer}?</p>
            <button onClick={handleConfirmPrayer} className="mt-2 bg-gold border-gold border-2	cursor-pointer text-gold px-4 py-2 rounded-lg font-bold hover:bg-opacity-80">Yes, I did</button>
          </div>
        )}
        {salahRecords.length === 0 ? (
          <p className="text-center text-gold">No Salah records found for this day.</p>
        ) : (
          <ul className="divide-y divide-gold">
            {salahRecords.map((record) => (
              <li key={record.id} className="flex justify-between items-center p-4">
                <span className="font-medium text-lg">{record.prayer_name}</span>
                <span className={`px-3 py-1 rounded text-sm font-bold ${record.status === "completed" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {record.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SalahTracker;
