'use client'

import { Accordion, AccordionDetails, AccordionSummary, DialogContent, DialogTitle, Dialog } from '@mui/material';
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function deadlineFormat(dateTime) {
  const now = new Date();
  const diff = Math.abs(now - dateTime) / 1000;

  const days = Math.floor(diff / 86400); 
  const hours = Math.floor((diff % 86400) / 3600); 
  const minutes = Math.floor(((diff % 86400) % 3600) / 60);

  return `${days}d ${hours}h ${minutes}m`;
}

function formatDateTime(dateTime) {
  const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDateTime = dateTime.toLocaleDateString('en-US', options);
  
  const day = dateTime.getDate();
  const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
  
  return formattedDateTime.replace(/\b\d{1,2}\b/, day + suffix);
}

const IAssignments = ({ assignments, lessonPlanID, setAssignments }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [curAss, setCurAss] = useState(null);
  const [grade, setGrade] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [end, setEnd] = useState();


  const handleGradeSubmit = async () => {
    // console.log(assignments[curAss.id-1]);
    // console.log({
    //     ...assignments[curAss.id-1],
    //     submissions: [
    //         {
    //             ...assignments[curAss.id-1].submissions[0],
    //             grade: grade
    //         }
    //     ]
    //   });
    setIsSubmitting(true);
    await fetch(`/api/assignments/`, {
      method: 'POST',
      body: JSON.stringify({
        ...assignments[curAss.id-1],
        submissions: [
            {
                ...assignments[curAss.id-1].submissions[0],
                grading: grade
            }
        ]
      })
    }).then(() => {
      setIsOpen(false);
      setAssignments([
        ...assignments.slice(0, curAss.id-1),
        {
        ...assignments[curAss.id-1],
        submissions: [
            {
                ...assignments[curAss.id-1].submissions[0],
                grading: grade
            }
        ]
        },
        ...assignments.slice(curAss.id),
      ])
    }).finally(() => {
        setGrade(5);
        setIsSubmitting(false);
    }); 
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await fetch(`/api/assignments/`, {
      method: 'POST',
      body: JSON.stringify({
        lid: lessonPlanID,
        title: title,
        description: description,
        end: end? new Date(end).toJSON() : new Date().toJSON()
      })
    }).then(() => {
      setIsOpen(false);
    }).finally(() => {
        setTitle('');
        setDescription('');
        setEnd(null);
        setIsSubmitting(false);
    });
  }

  return (
    <div className="w-full">
      <Dialog open={isCreateFormOpen} onClose={() => setIsCreateFormOpen(false)}>
        <div className='w-[500px]'>
          <DialogTitle>Assignment #{assignments.length+1}</DialogTitle>
          <DialogContent className='flex flex-col gap-3'>
            <input
                type="text"
                required
                className="relative block w-[50%] appearance-none rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                rows={5}
                required
                className="resize-none relative block w-[50%] appearance-none rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                required
                className="relative block w-[50%] appearance-none rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
            />
            <button className='py-2 w-full rounded-lg text-white bg-purple-1 active:bg-purple-2'
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting? 'Submitting...' :  'Submit Answer'}
            </button>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className='w-[500px]'>
          <DialogTitle>Assignment #{curAss?.id}</DialogTitle>
          <DialogContent className='flex flex-col gap-3'>
            <p className='text-sm'>Q. {curAss?.title} ({curAss?.description})</p>
            <div className='border border-gray-300 rounded-lg shadow-lg flex items-center justify-center gap-1'>
                <input
                type="number"
                min={1}
                max={10}
                required
                className="relative block w-[50%] appearance-none rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                />
                <p> / 10</p>
            </div>
            <button className='py-2 w-full rounded-lg text-white bg-purple-1 active:bg-purple-2'
              onClick={handleGradeSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting? 'Submitting...' :  'Submit Grade'}
            </button>
          </DialogContent>
        </div>
      </Dialog>
      <div className='max-w-7xl min-[50vh] py-6 px-2 mx-auto'>
        <div className="">
          {assignments.map((ass, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-wrap gap-2 items-end'>
                    <h3 className='h3-bold'>Assignment {index+1}: <span className='font-normal text-md'>{ass.title}</span></h3>
                    <p className=''>({ass.description})</p>
                  </div>
                  <div className='flex justify-between items-center'>
                    {ass.submissions?.length===0? <p>Deadline: {deadlineFormat(new Date(ass.end))}</p> : <p className='text-green-500'>SUBMITTED</p>}
                    {ass.submissions?.length > 0 && ass.submissions[0].grading && <p className='text-orange-500'>GRADED: {ass.submissions[0].grading}/10</p>}
                  </div>
                </div>
                </AccordionSummary>
              <AccordionDetails className='bg-slate-100'>
                {ass.submissions?.length > 0? (
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>{ass.submissions[0].solution}</p>
                    <p>Submitted at: {formatDateTime(new Date(ass.submissions[0].submitTime))}</p>
                    <button className='py-2 px-6 rounded-lg text-white bg-green-500 active:bg-green-600'
                        onClick={() => {
                        setCurAss({ id: index+1, title: ass.title, description: ass.description });
                        setIsOpen(true);
                        setGrade(ass.submissions[0].grading? ass.submissions[0].grading : 5 );
                        }}
                    >
                        Grade
                    </button>
                  </div>
                ) : (
                  <div className='bg-slate-100'>
                      Not submitted yet!!
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          ))}

          {assignments.length===0 && <p className='text-center'>No assignments found!</p>}

          <button className='mt-3 py-2 w-full rounded-lg text-white bg-purple-1 active:bg-purple-2'>
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  )
}



export default IAssignments;