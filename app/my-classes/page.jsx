'use client';

import ILessonPlans from '@/components/instructor/ILessonPlans';
import LessonPlans from '@/components/student/LessonPlans/LessonPlans';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

const page = () => {

  
  const { data: session } = useSession();
  const userType = session?.user?.type;


  return (
    <div className="w-full">
      <div className='max-w-7xl py-6 px-2 mx-auto'>
        {userType==='Instructor'? (
          <ILessonPlans />
        ) : (
          <LessonPlans />
        )}
      </div>
    </div>
  )
}

export default page