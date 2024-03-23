"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
// import Assignments from "./Assignments";

const ILessonPlans = () => {
  const [plans, setPlans] = useState([]);
  const router = useRouter();
  const [assignmentID, setAssignmentID] = useState(null);

  const fetchLessonPlans = async () => {
    const res = await fetch("/api/lessonPlans");
    const data = await res.json();
    // setPlans(data);
    console.log(data);
  };

  useEffect(() => {
    fetchLessonPlans();
  }, []);

  return (
    <div className={`w-full min-h-[60vh] ${assignmentID!==null && 'flex justify-between items-start'}`}>
      <div className={`${assignmentID!==null && 'min-w-[49%] max-w-[49%]'} flex flex-wrap gap-5`}>
        {plans.map((item, index) => (
          <div key={index} className="cursor-pointer" onClick={() => setAssignmentID(item._id)}>
            <div className="w-[350px] bg-slate-100 p-3 rounded-lg flex flex-col gap-2">
              <div className="aspect-w-1 aspect-h-1 h-[200px] overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={item.plan?.thumbnail}
                  alt={item.plan?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h2 className="text-md line-clamp-1">{item.plan?.title}</h2>
              <div className="flex items-center gap-5">
                <p>{item.plan?.domain}</p>
                <div className="flex">
                  <img src={"/assets/courses/Star.svg"} alt="star" />
                  <p className="ml-1">{item.plan?.rating}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={item.instructor?.img}
                  alt={item.instructor?.name}
                  className="w-6 h-6 rounded-full object-cover object-center"
                />
                <p className="font-medium">{item.instructor?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plans.length===0 && (
        <div className="w-full flex justify-center items-center">
          <p>No courses enrolled!</p>
        </div>
      )}

      {/* {assignmentID!==null && (
        <div className="min-w-[49%] max-w-[49%] py-3 px-2 bg-gray-100 rounded-lg">
          <div className="flex justify-end mb-3">
            <button onClick={() => setAssignmentID(null)}>
              <Close className="text-gray-500" />
            </button>
          </div>
          <Assignments id={assignmentID} />
        </div>
      )} */}
    </div>
  );
};

export default ILessonPlans;
