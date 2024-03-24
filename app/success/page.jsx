"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScheduleMeeting from '@/components/Course/ScheduleMeeting';

const SuccessPage = () => {
    const navigate = useRouter();
    // setTimeout(() => {
    //     navigate.push('/');
    // }, 5000);

    return (
    //     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    //     <div className="bg-white p-8 rounded-lg shadow-lg">
    //       <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
    //       <p className="text-lg text-gray-800">Thank you for your purchase. Your order has been successfully processed.</p>
    //         <p className="text-lg text-gray-800 mt-4">You will be redirected to the home page in 5 seconds.</p>
    //     </div>
    //   </div>

    <ScheduleMeeting />
        
    );
    }

export default SuccessPage;
