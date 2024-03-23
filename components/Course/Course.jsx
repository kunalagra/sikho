'use client'

import { Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import Link from 'next/link';
import Plans from '../Plans/Plans';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Course = ({ course }) => {

  const { data: session } = useSession();
  const navigate = useRouter();
  

  const isUser = session?.user?.type

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [isModuleNameEdit, setIsModuleNameEdit] = useState(true);
  const [moduleNoEdit, setModuleNoEdit] = useState(0);
  const [lessonNoEdit, setLessonNoEdit] = useState(0);
  const [modules, setModules] = useState(course.modules);

  const handleUpdate = (module) => {
    fetch(`/api/plans`, {
      method: 'POST',
      body: JSON.stringify(module),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( async (res) => { 
      if (res.status === 201) {
        const res = await fetch(`/api/getPlanByID?id=${module.id}`);
        const data = await res.json();
        setModules(data.modules);
        setIsEditModalOpen(false);
      }
      
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='w-full flex flex-col gap-8'>

      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Rename</DialogTitle>
        <DialogContent>
          <div className='w-[400px]'>
            <input
              type="text"
              required
              className="mb-3 py-3 relative block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
              placeholder={isModuleNameEdit? `Module ${moduleNoEdit+1} Title` : `Lesson ${lessonNoEdit+1} Title`}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            />
            <textarea
              type="text"
              required
              rows={5}
              className="resize-none mb-3 py-3 relative block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
              placeholder={isModuleNameEdit? `Module ${moduleNoEdit+1} Title` : `Lesson ${lessonNoEdit+1} Title`}
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
            />
            <button className="w-full py-3 text-white bg-blue-500 rounded-lg" onClick={() => {
              if (renameValue!=='') {
                const i = moduleNoEdit;
                const j = lessonNoEdit;
                let data = [];
                if (isModuleNameEdit) {
                  data = [...modules.slice(0,i),{...modules[i], title: renameValue, description: descValue} ,...modules.slice(i+1)];
                  setModules(data);
                }
                else {
                  data = [...modules.slice(0,i),
                    {...modules[i], lessons: [...modules[i].lessons.slice(0,j),{...modules[i].lessons[j], title: renameValue, content: descValue} ,...modules[i].lessons.slice(j+1)]},
                    ...modules.slice(i+1)
                  ];
                  setModules(data);
                }
                // console.log(data);
                handleUpdate({id: course._id, modules: data});
              }
            }}>
              Rename
            </button>
          </div>
        </DialogContent>
      </Dialog>


      <div className='flex flex-col gap-4'>
        <div className=''>
          <img
            src={course.thumbnail}
            alt={course.title}
            className='w-full h-[400px] object-cover'
          />
        </div>
        <h2 className='h1-bold'>
          {course.title}
        </h2>
        <p className='text-gray-600'>
          {course.description}
        </p>
        <div className='flex gap-4 items-center'>
          <div className="flex items-center gap-1">
            <p>{course.rating} </p>
            <img src={'/assets/courses/Star.svg'} alt="star" />
          </div>
          <p className='underline'>230 reviews</p>
          <div className='bg-slate-300 py-1 px-2 rounded-lg'>
            <p>Enrolled : {course.lessons.length}</p>
          </div>
          <p>|</p>
          <div>
            <p>By {course.instructor.name}</p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button className='py-2 px-6 rounded-lg border text-purple-1 hover:text-white border-purple-1 hover:bg-purple-1 transition-all'>
            Add to Cart
          </button>
          <Link href='/checkout'>
            <button className='py-2 px-6 rounded-lg text-white bg-purple-1 active:bg-purple-2'
              onClick={() => {
                navigate.push('/checkout')
              }}
            >
              Buy now
            </button>
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-4 px-4 py-8 shadow-lg bg-white rounded-lg'>
        <h3 className='h3-bold'>
          What you'll learn
        </h3>

        <ul className='list-disc'><li className='ml-5'>In this course, you'll have the opportunity to learn from an experienced instructor who brings a wealth of expertise and practical knowledge to the table.</li> <li className='ml-5'>With a proven track record in the field of software development, I am dedicated to providing clear, concise, and engaging instruction that empowers students to succeed.</li> <li className='ml-5'>From building robust applications to implementing efficient coding practices, I'll guide you through the intricacies of software development with ease.</li> <li className='ml-5'>Through comprehensive explanations, hands-on demonstrations, and real-world examples, I strive to make complex software development concepts accessible and understandable for learners of all levels.</li> <li className='ml-5'>By choosing this course, you'll benefit from my passion for teaching and commitment to helping you achieve your goals in mastering software development.</li></ul>
      </div>
      
      <div className='flex flex-col gap-4 px-4 py-8 shadow-lg bg-white rounded-lg'>
        <h3 className='h3-bold'>
          Modules
        </h3>
        <div>
          {modules.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <div className='flex items-center gap-6'>
                  <p className='text-lg font-semibold'>Module {index+1}: {item.title}</p>
                  <div className='flex gap-2'>
                    {isUser == "Instructor" && 
                      <button onClick={() => {setModuleNoEdit(index); setRenameValue(item.title); setDescValue(item.description); setIsModuleNameEdit(true); setIsEditModalOpen(true);}}>
                        <EditIcon className='bg-blue-500 active:bg-blue-600 rounded-lg p-1 cursor-pointer text-white' 
                        />
                      </button>
                    }
                    {isUser == "Instructor" && 
                      <button onClick={() => {if (confirm(`Delete Module ${index+1}?`)) setModules([...modules.slice(0,index), ...modules.slice(index+1)])}}>
                        <DeleteIcon className='bg-red-500 active:bg-red-600 rounded-lg p-1 cursor-pointer text-white' /> 
                      </button>
                    }
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {item.description}
                {item.lessons.map((lesson, ind) => (
                  <div className='mt-3' key={ind}>
                    <div className='flex gap-5 items-center'>
                      <p className='font-bold'>Lesson {ind+1}: {lesson.title}</p>
                      <div className='flex gap-2'>
                        {isUser == "Instructor" && 
                          <button onClick={() => {
                            setModuleNoEdit(index); 
                            setLessonNoEdit(ind); 
                            setRenameValue(lesson.title); setDescValue(lesson.content); setIsModuleNameEdit(false); setIsEditModalOpen(true);}}>
                            <EditIcon className='bg-blue-500 active:bg-blue-600 rounded-lg p-1 cursor-pointer text-white' 
                            />
                          </button>
                        }
                        {isUser == "Instructor" && 
                          <button onClick={() => {
                            if (confirm(`Delete Lesson ${ind+1}?`)) 
                              setModules([...modules.slice(0,index), {...modules[index], lessons: [...modules[index].lessons.slice(0,ind), ...modules[index].lessons.slice(ind+1)]}, ...modules.slice(index+1)])
                          }}>
                            <DeleteIcon className='bg-red-500 active:bg-red-600 rounded-lg p-1 cursor-pointer text-white' />
                          </button>
                        }
                      </div>
                    </div>
                    <p>
                      {lesson.content}
                    </p>
                  </div>
                ))}
                <button className='bg-green-500 active:bg-green-500 text-white py-1.5 px-3 rounded-lg mt-4' onClick={() => {
                  setModules([...modules.slice(0,index), {...modules[index], lessons: [...modules[index].lessons, { title: 'Title', content: 'Description' }]}, ...modules.slice(index+1)]);
                }}>
                  Add Lesson
                </button>
              </AccordionDetails>
            </Accordion>
          ))}
          <button className='bg-green-500 active:bg-green-500 text-white py-1.5 px-3 rounded-lg mt-4' onClick={()=> {
            setModules([...modules, { title: 'Title', description: 'Description', lessons: [] }]);
          }}>
            Add Module
          </button>
        </div>
      </div>

      <div id="buy-course" className='my-6'>
        <h2 className='h2-bold text-center mb-4'>Pricings</h2>
        <Plans Price={course.price} />
      </div>
    </div>
  )
}

export default Course