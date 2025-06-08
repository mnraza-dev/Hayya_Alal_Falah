
import React from 'react';

const SalahCard = ({ salah }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{salah.prayer_name}</h3>
      <p>Date: {new Date(salah.date).toLocaleDateString()}</p>
      <p>Status: <span className={salah.status === 'completed' ? 'text-green-500' : 'text-red-500'}>{salah.status}</span></p>
      <div className="mt-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );
};

export default SalahCard;