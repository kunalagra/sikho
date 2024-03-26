"use client";


import React, { useEffect, useState } from "react";
import { Close, ArrowLeft } from "@mui/icons-material";
import IAssignments from "./IAssignments";

const ILessonPlans = () => {
  const [plans, setPlans] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lessonPlanID, setLessonPlanID] = useState(null);

  const fetchLessonPlans = async () => {
    const res = await fetch("/api/lessonPlans");
    const data = await res.json();
    setPlans(data);
  };

  useEffect(() => {
    fetchLessonPlans();
  }, []);

  return (
    <div className={`w-full min-h-[60vh]`}>
      {!selectedPlan? (
        <>
          <div className={`flex flex-wrap gap-5`}>
            {plans.map((item, index) => (
              <div key={index} className="cursor-pointer" onClick={() => setSelectedPlan(plans[index])}>
                <div className="w-[350px] bg-slate-100 p-3 rounded-lg flex flex-col gap-2">
                  <div className="aspect-w-1 aspect-h-1 h-[200px] overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h2 className="text-md font-bold line-clamp-1">{item.title}</h2>
                  <div className="flex items-center gap-5">
                    <p>{item.domain}</p>
                    <div className="flex">
                      <img src={"/assets/courses/Star.svg"} alt="star" />
                      <p className="ml-1">{item.rating}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">Total sessions: {item.totalclasses}</p>
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
        </>
      ) : (
        <div className={`${selectedUser!==null && 'flex justify-between items-start w-full'}`}>
          <div className={`${selectedUser!==null && 'min-w-[49%] max-w-[49%]'} flex flex-col mb-3`}>
            <button className="flex gap-2 items-center" onClick={() => setSelectedPlan(null)}>
              <ArrowLeft className="text-gray-500" />
              Back
            </button>

            <div className='flex flex-col gap-4 mt-5 mb-5'>
              <div className=''>
                <img
                  src={selectedPlan.thumbnail}
                  alt={selectedPlan.title}
                  className='w-full h-[400px] object-cover'
                />
              </div>
              <h2 className='h1-bold'>
                {selectedPlan.title}
              </h2>
              <p className='text-gray-600'>
                {selectedPlan.description}
              </p>
              <div className='flex gap-4 items-center'>
                <div className="flex items-center gap-1">
                  <p>{selectedPlan.rating} </p>
                  <img src={'/assets/courses/Star.svg'} alt="star" />
                </div>
                <p className='underline'>230 reviews</p>
                <div className='bg-slate-300 py-1 px-2 rounded-lg'>
                  <p>Enrolled : {selectedPlan.lessons.length}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="h3-bold mb-2 mt-8">Enrolled Students</h2>
              {selectedPlan.lessons.map((item, index) => (
                <div key={index} className={`cursor-pointer border-2 border-gray-500 shadow-lg rounded-lg py-2 px-2 ${selectedUser===index && 'bg-gray-100'}`}
                  onClick={() => {setAssignments(item.assignments); setSelectedUser(index); setLessonPlanID(item._id)}}
                >
                  {item.size===1? (
                    <div className="flex gap-5 items-center py-2 px-4">
                      <p className="text-lg">#{index+1}</p>
                      <div className="flex gap-4">
                        <p>Type: Individual</p>
                        <p>Member: ({item.student[0].name})</p>
                      </div>
                    </div> 
                  ) : (
                    <div className="flex gap-5 items-center py-2 px-4">
                      <p className="text-lg">#{index+1}</p>
                      <div className="flex gap-4">
                        <p>Type: Group</p>
                        <p className="break-words">Members: ({item.student.map(it => it.name).join(',')})</p>
                      </div>
                    </div>
                  )}
                </div>
              ))} 
            </div>
          </div>

          {selectedUser!==null && (
            <div className="mt-10 min-w-[49%] max-w-[49%] py-3 px-2 bg-gray-100 rounded-lg">
              <div className="flex justify-end mb-3">
                <button onClick={() => {setAssignments([]); setSelectedUser(null);}}>
                  <Close className="text-gray-500" />
                </button>
              </div>
              <IAssignments assignments={assignments} lessonPlanID={lessonPlanID} setAssignments={setAssignments} />
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ILessonPlans;
