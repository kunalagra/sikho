'use client'

import { Accordion, AccordionDetails, AccordionSummary, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
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

const Assignments = ({ id }) => {

  const [assignments, setAssignments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [curAss, setCurAss] = useState(null);
  const [solution, setSolution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAssignments = async () => {
    const res = await fetch(`/api/assignments?id=${id}`);
    const data = await res.json();
    setAssignments(data);
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);
    const res = await fetch(`/api/assignments/`, {
      method: 'POST',
      body: JSON.stringify({
        aid: assignments[curAss.id-1]._id,
        solution: solution
      })
    }).then(() => {
      setIsOpen(false);
      setIsSubmitting(false);
      setSolution('');
      fetchAssignments();
    });

  }

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="w-full">
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className='w-[500px]'>
          <DialogTitle>Assignment #{curAss?.id}</DialogTitle>
          <DialogContent className='flex flex-col gap-3'>
            <p className='text-sm'>Q. {curAss?.title} ({curAss?.description})</p>
            <textarea
              required
              rows={5}
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500  resize-none"
              placeholder="Solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
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
                  {ass.submissions?.length===0? <p>Deadline: {deadlineFormat(new Date(ass.end))}</p> : <p className='text-green-500'>SUBMITTED</p>}
                </div>
                </AccordionSummary>
              <AccordionDetails className='bg-slate-100'>
                {ass.submissions?.length > 0? (
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm'>{ass.submissions[0].solution}</p>
                    <p>Submitted at: {formatDateTime(new Date(ass.submissions[0].submitTime))}</p>
                  </div>
                ) : (
                  <div className='bg-slate-100'>
                    <button className='py-2 px-6 rounded-lg text-white bg-green-500 active:bg-green-600'
                      onClick={() => {
                        setCurAss({ id: index+1, title: ass.title, description: ass.description });
                        setIsOpen(true);
                      }}
                    >
                      Submit Answer
                    </button>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}



export default Assignments;