// hooks/useSalahRecords.js
import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const useSalahRecords = (selectedDate) => {
  const [salahRecords, setSalahRecords] = useState([]);

  useEffect(() => {
    const fetchSalahRecords = async () => {
      try {
        const response = await axios.get(`/salah_tracker/api/salah/?date=${selectedDate}`);
        setSalahRecords(response.data);
      } catch (error) {
        console.error("Error fetching Salah records:", error);
      }
    };
    fetchSalahRecords();
  }, [selectedDate]);

  return salahRecords;
};

export default useSalahRecords;
