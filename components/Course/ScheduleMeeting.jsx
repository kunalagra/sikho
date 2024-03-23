import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const ScheduleMeeting = () => {

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState(0);

  const timings = ['8:00 AM','11:00 AM','1:00 PM', '5:00 PM']

  return (
    <div>
      <Dialog open={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)}>
        <div className="w-[500px] bg-white rounded-lg">
          <DialogTitle>
            <p className="font-medium">Schedule the session</p>
          </DialogTitle>

          <DialogContent>
            <div className="flex items-center gap-6">
              <p className="">Select Date</p>
              <input 
                type="date"
                value={selectedDate}
                onChange={setSelectedDate}
                required
              />
            </div>
            <p className="mt-3 mb-2">Select Time</p>
            <div className="flex flex-wrap gap-3">
              {timings.map((timing, index) => (
                <div key={index}
                  className={`flex gap-3 cursor-pointer bg-slate-200 rounded-lg px-3 py-2 ${selectedTime===index && "border-2 border-slate-400"}`} onClick={() => setSelectedTime(index)}>
                  <FiberManualRecordIcon className="text-green-500" />
                  <p>{timing}</p>
                </div>
              ))}
            </div>
            <button className="mt-5 bg-purple-1 hover:bg-purple-2 transition-all text-white py-2 w-full rounded-lg" onClick={() => {}}>
              Schedule
            </button>
          </DialogContent>
        </div>

      </Dialog>
    </div>
  );
};

export default ScheduleMeeting;
