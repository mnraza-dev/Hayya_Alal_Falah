import React, { useEffect, useState } from 'react';
import { useSalah } from '../hooks/useSalah';
import SalahCard from '../components/SalahCard';
import FilterBar from '../components/FilterBar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { salahRecords, fetchSalahRecords, loading, error } = useSalah();
  const [filters, setFilters] = useState({ date: '', prayer: '', status: '' });

  useEffect(() => {
    fetchSalahRecords(filters);
  }, [filters]);
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Completed Prayers',
        data: [25, 30, 28, 32, 35, 33, 29], // Replace with API data
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Missed Prayers',
        data: [5, 3, 7, 4, 2, 6, 8], // Replace with API data
        backgroundColor: '#F44336',
        borderColor: '#D32F2F',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Prayers' } },
      x: { title: { display: true, text: 'Day of the Week' } },
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weekly Salah Progress' },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 font-naskh">Hayya Alal Falah</h1>
      
      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Salah Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {salahRecords.map((salah) => (
          <SalahCard key={salah.id} salah={salah} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;