"use client";
import Course from '@/components/Course/Course';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';


const page = () => {

  const { id } = useParams();
  const [course, setCourse] = useState(null);

  // const course = {
  //   "title": "HTML, CSS, Javascript & React Development",
  //   "price": 250,
  //   "domain": "Programming",
  //   "description": "This course will walk you through HTML, CSS & JS development.",
  //   "totalclasses": 12,
  //   "time": 60,
  //   "thumbnail": "/assets/courses/1_reactandhtml.jpg",
  //   "author": "James Bond",
  //   "modules": [
  //     {
  //       "id": 1,
  //       "title": "Module 1",
  //       "description": "Description of Module 1",
  //       "lessons": [
  //         {
  //           "title": "Lesson 1",
  //           "content": "Content of Lesson 1"
  //         },
  //         {
  //           "title": "Lesson 2",
  //           "content": "Content of Lesson 2"
  //         }
  //       ]
  //     }
  //   ]
  // }

  useEffect(() => {
    async function fetchCourse(id) {
      const res = await fetch(`/api/getPlanByID?id=${id}`);
      const data = await res.json();
      setCourse(data);
      return data;
    }
    fetchCourse(id);
    // console.log(course);
  } , [id]);

  return (
    <div className='bg-lightpink-1'>
      <div className='max-w-7xl mx-auto pt-6 pb-16 px-8'>
        {course && <Course course={course} />}
      </div>
    </div>
  )
}

export default page