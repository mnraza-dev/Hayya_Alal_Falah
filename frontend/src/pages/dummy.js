
  useEffect(() => {
    const fetchSalahRecords = async () => {
      try {
        const response = await axios.get("/salah_tracker/api/salah/", {
          params: { date: selectedDate },
        });
        setSalahRecords(response.data);
      } catch (error) {
        console.error("Error fetching Salah records:", error);
      }
    };

    fetchSalahRecords();
  }, [selectedDate]);

  const handleStatusChange = async (prayerName, newStatus) => {
    try {
      await axios.put("/salah_tracker/api/salah/update_status/", {
        prayer_name: prayerName,
        status: newStatus,
        date: selectedDate,
      });
      setSalahRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.prayer_name === prayerName
            ? { ...record, status: newStatus }
            : record
        )
      );
    } catch (error) {
      console.error("Error updating Salah record:", error);
    }
  };

  return (

     
      <div className="w-full max-w-2xl space-y-4">
        {salahRecords.length === 0 ? (
          <p className="text-center text-gold">No Salah records found for this day.</p>
        ) : (
          salahRecords.map((record, index) => (
           
          ))
        )}
      </div>
    </div>
  );
};

export default SalahTrackerUI;
