'use client'

import { Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import Link from 'next/link';

const Course = ({ }) => {

  const isUser = false;

    const course = {
        "title": "HTML, CSS, Javascript & React Development",
        "price": 250,
        "domain": "Programming",
        "description": "This course will walk you through HTML, CSS & JS development.",
        "totalclasses": 12,
        "time": 60,
        "thumbnail": "/assets/courses/1_reactandhtml.jpg",
        "author": "James Bond",
        "modules": [
          {
            "id": 1,
            "title": "Module 1",
            "description": "Description of Module 1",
            "lessons": [
              {
                "title": "Lesson 1",
                "content": "Content of Lesson 1"
              },
              {
                "title": "Lesson 2",
                "content": "Content of Lesson 2"
              }
            ]
          }
        ]
      }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [isModuleNameEdit, setIsModuleNameEdit] = useState(true);
  const [itemNoEdit, setItemNoEdit] = useState(true);

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
              placeholder={`${isModuleNameEdit? 'Module' : 'Lesson'} ${itemNoEdit+1} Title`}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            />
            <button className="w-full py-3 text-white bg-blue-500 rounded-lg" onClick={() => {}}>
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
          <p>4.8 stars</p>
          <p className='underline'>230 reviews</p>
          <div className='bg-slate-300 py-1 px-2 rounded-lg'>
            <p>123 students enrolled</p>
          </div>
          <p>|</p>
          <div>
            <p>By {course.author}</p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button className='py-2 px-6 rounded-lg border text-purple-1 hover:text-white border-purple-1 hover:bg-purple-1 transition-all'>
            Add to Cart
          </button>
          <Link href='#buy-course'>
            <button className='py-2 px-6 rounded-lg text-white bg-purple-1 active:bg-purple-2'>
              Buy now
            </button>
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-4 px-4 py-8 shadow-lg bg-white rounded-lg'>
        <h3 className='h3-bold'>
          What you'll learn
        </h3>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, aliquam voluptas laudantium incidunt architecto nam excepturi provident rem laborum repellendus placeat neque aut doloremque ut ullam, veritatis nesciunt iusto officia alias, non est vitae. Eius repudiandae optio quam alias aperiam nemo nam tempora, dignissimos dicta excepturi ea quo ipsum omnis maiores perferendis commodi voluptatum facere vel vero. Praesentium quisquam iure veritatis, perferendis adipisci sequi blanditiis quidem porro eligendi fugiat facilis inventore amet delectus expedita deserunt ut molestiae modi laudantium, quia tenetur animi natus ea. Molestiae molestias ducimus pariatur et consectetur. Error vero, eum soluta delectus necessitatibus eligendi numquam hic at?</p>
      </div>

      <div className='flex flex-col gap-4 px-4 py-8 shadow-lg bg-white rounded-lg'>
        <h3 className='h3-bold'>
          Modules
        </h3>
        <div>
          {course.modules.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <div className='flex items-center gap-6'>
                  <p className='text-lg font-semibold'>Module {index+1}: {item.title}</p>
                  <div className='flex gap-2'>
                    {!isUser && 
                      <button onClick={() => {setItemNoEdit(index); setRenameValue(item.title); setIsModuleNameEdit(true); setIsEditModalOpen(true);}}>
                        <EditIcon className='bg-blue-500 active:bg-blue-600 rounded-lg p-1 cursor-pointer text-white' 
                        />
                      </button>
                    }
                    {!isUser && <DeleteIcon className='bg-red-500 active:bg-red-600 rounded-lg p-1 cursor-pointer text-white' />}
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
                        {!isUser && 
                          <button onClick={() => {setItemNoEdit(ind); setRenameValue(lesson.title); setIsModuleNameEdit(false); setIsEditModalOpen(true);}}>
                            <EditIcon className='bg-blue-500 active:bg-blue-600 rounded-lg p-1 cursor-pointer text-white' 
                            />
                          </button>
                        }
                        {!isUser && <DeleteIcon className='bg-red-500 active:bg-red-600 rounded-lg p-1 cursor-pointer text-white' />}
                      </div>
                    </div>
                    <p>
                      {lesson.content}
                    </p>
                  </div>
                ))}
                <button className='bg-green-500 active:bg-green-500 text-white py-1.5 px-3 rounded-lg mt-4'>
                  Add Lesson
                </button>
              </AccordionDetails>
            </Accordion>
          ))}
          <button className='bg-green-500 active:bg-green-500 text-white py-1.5 px-3 rounded-lg mt-4'>
            Add Module
          </button>
        </div>
      </div>
    </div>
  )
}

export default Course