// import axiosInstance from "../api/axiosInstance";
import { Button } from "./ui/button";

const SalahConfirmation = ({
  currentPrayer,
  currentStatus,
  handleStatusChange,
  selectedDate,
}) => {
  return (
    <div className="mb-4 p-4 bg-gold text-black rounded-lg">
      <p className="text-lg font-bold">Did you pray {currentPrayer}?</p>
      <Button
        disabled={currentStatus === "completed"}
        onClick={() =>
          handleStatusChange(
            currentPrayer,
            currentStatus === "completed" ? "missing" : "completed",
            selectedDate
          )
        }
        className={`cursor-pointer w-[10rem] px-4 py-2 rounded-lg font-bold transition-opacity ${
          currentStatus === "completed"
            ? "bg-green-500 cursor-no-drop hover:bg-green-600 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        {currentStatus === "completed"
          ? "Mark as Missing"
          : "Mark as Completed"}
      </Button>
    </div>
  );
};

export default SalahConfirmation;