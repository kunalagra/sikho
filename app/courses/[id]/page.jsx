import Course from '@/components/Course/Course';
import React from 'react'

const page = () => {

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

  return (
    <div className='bg-lightpink-1'>
      <div className='max-w-7xl mx-auto pt-6 pb-16 px-8'>
        <Course course={course} />
      </div>
    </div>
  )
}

export default page