// components/SalahConfirmation.js
const SalahConfirmation = ({ currentPrayer, currentStatus, handleStatusChange }) => {
  const toggleStatus = () => {
    // Toggle the status based on the current one
    const newStatus = currentStatus === "completed" ? "missing" : "completed";
    handleStatusChange(currentPrayer, newStatus);
  };

  return (
    <div className="mb-4 p-4 bg-gold text-black rounded-lg">
      <p className="text-lg font-bold">Did you pray {currentPrayer}?</p>
      <button
        onClick={toggleStatus}
        className="mt-2 bg-gold border-gold border-2 cursor-pointer text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-80"
      >
        {currentStatus === "completed" ? "Mark as Missing" : "Mark as Completed"}
      </button>
    </div>
  );
};

export default SalahConfirmation;
