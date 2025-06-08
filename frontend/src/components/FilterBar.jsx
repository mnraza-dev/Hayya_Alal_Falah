
import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleFilterChange}
        className="border p-2 rounded"
      />
      <select
        name="prayer"
        value={filters.prayer}
        onChange={handleFilterChange}
        className="border p-2 rounded"
      >
        <option value="">All Prayers</option>
        <option value="fajr">Fajr</option>
        <option value="dhuhr">Dhuhr</option>
        <option value="asr">Asr</option>
        <option value="maghrib">Maghrib</option>
        <option value="isha">Isha</option>
      </select>
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="completed">Completed</option>
        <option value="missed">Missed</option>
      </select>
    </div>
  );
};

export default FilterBar;