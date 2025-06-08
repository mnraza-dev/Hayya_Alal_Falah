
import { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export const useSalah = () => {
  const { token } = useContext(AuthContext);
  const [salahRecords, setSalahRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSalahRecords = async (filters) => {
    setLoading(true);
    try {
      const response = await axios.get('/salah_tracker/api/salah/', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setSalahRecords(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch Salah records');
    } finally {
      setLoading(false);
    }
  };

  return { salahRecords, fetchSalahRecords, loading, error };
};  