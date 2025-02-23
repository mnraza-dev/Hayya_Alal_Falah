import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const SalahTracker = () => {
  const [salahRecords, setSalahRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalahRecords = async () => {
      try {
        const response = await axios.get("/salah_tracker/api/salah/");
        setSalahRecords(response.data);
      } catch (error) {
        console.error("Error fetching Salah records:", error);
        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };

    fetchSalahRecords();
  }, []);

  return (
    <div className="p-4">
      <h1 class="text-3xl font-bold underline">Salah Tracker</h1>
      <ul>
        {salahRecords.length === 0 ? (
          <p>No records found.</p>
        ) : (
          salahRecords.map((record) => (
            <li key={record.id}>
              {record.prayer_name} - {record.status} on {record.date}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SalahTracker;
