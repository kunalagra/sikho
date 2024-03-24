'use client';

import ILessonPlans from '@/components/instructor/ILessonPlans';
import LessonPlans from '@/components/student/LessonPlans/LessonPlans';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const page = () => {

  const navigate = useRouter();
  const { data: session } = useSession();
  const userType = session?.user?.type;


  return (
    <div className="w-full flex flex-col">
      <div className='max-w-7xl pt-6 px-2 mx-auto'>
        {userType === 'Instructor' ? (
          <ILessonPlans />
        ) : (
          <LessonPlans />
        )}
      </div>
      <div className="flex justify-center w-full pb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate.push('/professional')}>
           Join Class
        </button>
      </div>
    </div>
  )
}

export default page