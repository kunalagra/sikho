import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";


const ScheduleMeeting = (props) => {

  const localizer = momentLocalizer(moment)

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState(0);

  const timings = ['8:00 AM','11:00 AM','1:00 PM', '5:00 PM']

  const events = [
    {
      "id": 0,
      "start": new Date(2024, 2, 24, 8, 0),
      "end": new Date(2024, 2, 24, 9, 0),
      "title": 'Meeting with Kunal'
    },
    {
      "id": 1,
      "start": new Date(2024, 2, 24, 9, 0),
      "end": new Date(2024, 2, 24, 11, 0),
      "title": 'Meeting with John'
    },
    {
      "id": 2,
      "start": new Date(2024, 2, 24, 18, 0),
      "end": new Date(2024, 2, 24, 20, 0),
      "title": 'Meeting with John'
    },
  ]

  return (
    // <div>
    //   <Dialog open={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)}>
    //     <div className="w-[500px] bg-white rounded-lg">
    //       <DialogTitle>
    //         <p className="font-medium">Schedule the session</p>
    //       </DialogTitle>

    //       <DialogContent>
    //         <div className="flex items-center gap-6">
    //           <p className="">Select Date</p>
    //           <input 
    //             type="date"
    //             value={selectedDate}
    //             onChange={setSelectedDate}
    //             required
    //           />
    //         </div>
    //         <p className="mt-3 mb-2">Select Time</p>
    //         <div className="flex flex-wrap gap-3">
    //           {timings.map((timing, index) => (
    //             <div key={index}
    //               className={`flex gap-3 cursor-pointer bg-slate-200 rounded-lg px-3 py-2 ${selectedTime===index && "border-2 border-slate-400"}`} onClick={() => setSelectedTime(index)}>
    //               <FiberManualRecordIcon className="text-green-500" />
    //               <p>{timing}</p>
    //             </div>
    //           ))}
    //         </div>
    //         <button className="mt-5 bg-purple-1 hover:bg-purple-2 transition-all text-white py-2 w-full rounded-lg" onClick={() => {}}>
    //           Schedule
    //         </button>
    //       </DialogContent>
    //     </div>

    //   </Dialog>
    // </div>
    <div>
        <Calendar
          localizer={localizer}
          events={events}
          // views={['month', 'week', 'day']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 , paddingLeft: 20, paddingRight: 20}}
          popup = {true}
          selectable = {true}
          onSelectEvent = {event => console.log(event)}
          
        />
        </div>
  );
};

export default ScheduleMeeting;
