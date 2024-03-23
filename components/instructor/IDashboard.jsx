import React from 'react'

const IDashboard = () => {
  return (
    <div className='w-full pt-5 pb-12 px-2 bg-lightpink-1'>
        <div className='max-w-5xl flex flex-col gap-5 mx-auto'>
            <h1 className='h1-bold'>
                Dashboard
            </h1>
            <div className='flex gap-5'>
                <div className='w-1/3 rounded-lg bg-orange-300 flex flex-col items-center justify-center py-6'>
                    <h2 className='h2-bold'>4.5</h2>
                    <p>Avg Rating</p>
                </div>
                <div className='w-2/3 flex flex-col gap-5'>
                    <div className='flex gap-5'>
                        <div className='w-[50%] rounded-lg bg-green-300 flex flex-col items-center justify-center py-6'>
                            <h2 className='h2-bold'>5</h2>
                            <p>Total Courses</p>
                        </div>
                        <div className='w-[50%] rounded-lg bg-purple-300 flex flex-col items-center justify-center py-6'>
                            <h2 className='h2-bold'>30</h2>
                            <p>Total Students Enrolled</p>
                        </div>
                    </div>
                    <div className='rounded-lg bg-yellow-300 flex flex-col items-center justify-center py-6'>
                        <h2 className='h2-bold'>₹ 25000</h2>
                        <p>Total Earnings</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IDashboard