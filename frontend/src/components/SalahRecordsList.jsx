const SalahRecordsList = ({ salahRecords, handleStatusChange }) => (
  <ul className="divide-y divide-gold">
    {salahRecords.map((record) => (
      <li key={record.id} className="flex justify-between items-center p-4">
        <span className="font-medium text-lg">{record.prayer_name}</span>
        <span
          className={`px-3 py-1 rounded text-sm font-bold ${
            record.status === "completed"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {record.status}
        </span>
        <button
          onClick={() => handleStatusChange(record.prayer_name, record.status === "completed" ? "missing" : "completed")}
          className="cursor-pointer ml-4 bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-80"
        >
          {record.status === "completed" ? "Mark as Missing" : "Mark as Completed"}
        </button>
      </li>
    ))}
  </ul>
);

export default SalahRecordsList;