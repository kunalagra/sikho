"use client";
import Course from '@/components/Course/Course';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';


const page = () => {

  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchCourse(id) {
      const res = await fetch(`/api/getPlanByID?id=${id}`);
      const data = await res.json();
      setCourse(data);
      return data;
    }
    fetchCourse(id);
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