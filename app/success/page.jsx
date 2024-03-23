"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
    const navigate = useRouter();
    setTimeout(() => {
        navigate.push('/');
    }, 5000);


    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-4xl font-bold text-black">Thank you for your purchase!</h1> 
            <h2 className="text-2xl font-bold text-black">Redirecting to home page...</h2>
        </div>
        
    );
    }

export default SuccessPage;
