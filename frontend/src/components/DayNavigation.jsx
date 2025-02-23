import React from 'react'
import dayjs from "dayjs";

const DayNavigation = ({ handlePrevDay, handleNextDay, selectedDate }) => {
  return (
    <>
 <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <button
          onClick={handlePrevDay}
          className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-80"
        >
          ← Prev Day
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button
          onClick={handleNextDay}
          disabled={selectedDate === dayjs().format("YYYY-MM-DD")}
          className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-80 disabled:opacity-50"
        >
          Next Day →
        </button>
      </div>
    
    </>
  )
}

export default DayNavigation