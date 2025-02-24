import { CardContent, Card } from './ui/card'
import { Button } from './ui/button'

const SalahRecordsList = ({ salahRecords, handleStatusChange }) => (
  <div className="divide-y divide-gold">
    {salahRecords.map((record, index) => (
      <Card
        key={index}
        className="p-4 flex justify-between items-center bg-[#0B0C10] border border-[#FFD700] rounded-2xl shadow-lg"
      >
        <CardContent className="flex justify-between items-center w-full">
          <span className=" text-white text-lg font-medium">{record.prayer_name}</span>
          <Button
            onClick={() => handleStatusChange(record.prayer_name, record.status === "completed" ? "missing" : "completed")}
            className={`px-4 py-2 rounded-lg font-bold transition-opacity ${
              record.status === "completed"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {record.status === "completed" ? "Mark as Missing" : "Mark as Completed"}
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default SalahRecordsList;
