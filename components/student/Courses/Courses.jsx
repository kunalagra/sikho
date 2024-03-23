"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import { GlobeAltIcon, DevicePhoneMobileIcon, CircleStackIcon, CloudIcon } from '@heroicons/react/24/outline';
import { useRouter } from "next/navigation";


const NamesList = () => {

    const [courses, setCourses] = useState([]);
    const [selectedButton, setSelectedButton] = useState('web development');
    const router = useRouter();

    const handleButtonClick = async (domain) => {
        const res = await fetch("/api/plans");
        const data = await res.json();
        setCourses(data.filter(course => {
          return course.domain.toLowerCase()===domain
        }));
        setSelectedButton(domain);
      };
    
    useEffect(() => {
        handleButtonClick(selectedButton);
    }, []);


    const nameElements = courses.map((name, index) => (

        <div key={index} className="cursor-pointer"
        onClick={() => router.push(`/courses/${name._id}`)}>
            <div className="w-[350px] text-lg sm:text-sm bg-slate-100 p-3 rounded-lg">
            <div className="aspect-w-1 aspect-h-1 h-[200px]  overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <img
                    src={name.thumbnail}
                    alt={name.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className='flex justify-between'>
                    <div className="mt-6 block font-normal text-gray-900">
                        {name.domain}
                    </div>
                    <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
                        ₹ {name.price}
                    </div>
                </div>
                <p aria-hidden="true" className="mt-2 mb-5 text-xl font-semibold line-clamp-1">
                    {name.title}
                </p>

                <div className='flex justify-between border-solid border-2 border-grey500 rounded-md p-2'>
                    <p>{name.totalClasses} Classes</p>
                    <div className='flex flex-row space-x-4'>
                        <div className='flex'>
                            <img src={'/assets/courses/account.svg'} alt="circle" />
                            <p className='text-lightgrey ml-1'>123</p>
                        </div>
                        <div className='flex'>
                            <img src={'/assets/courses/Star.svg'} alt="star" />
                            <p className='ml-1'>{name.rating}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    ));


    return (
        <div>
            <div id='courses-section' className="mx-auto max-w-2xl py-6 px-4 lg:max-w-7xl lg:px-8">

                <div className='sm:flex justify-between items-center pb-12'>
                    <h2 className="h1-bold tracking-tight text-gray-900 my-4">Popular Courses</h2>
                    <div>
                        <button 
                            onClick={() => router.push('/explore')}
                        className="bg-transparent hover:bg-purple-1 text-purple font-medium hover:text-white py-3 px-4 border border-purple hover:border-transparent rounded">
                            Explore Classes
                        </button>
                    </div>
                </div>

                <div className='flex nowhitespace space-x-5 rounded-xl bg-white p-1 overflow-x-auto'>

                    {/* FOR DESKTOP VIEW */}
                    <button onClick={() => handleButtonClick('web development')} className={"bg-white " + (selectedButton === 'web development' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Web Development</button>
                    <button onClick={() => handleButtonClick('software development')} className={"bg-white " + (selectedButton === 'software development' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Software Development</button>
                    <button onClick={() => handleButtonClick('programming')} className={"bg-white " + (selectedButton === 'programming' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Programming</button>
                    <button onClick={() => handleButtonClick('machine learning')} className={"bg-white " + (selectedButton === 'machine learning' ? 'text-black border-b-2 border-orange' : 'text-lightgrey') + " pb-2 text-lg hidden sm:block"}>Machine Learning</button>

                    {/* FOR MOBILE VIEW */}
                    <GlobeAltIcon onClick={() => handleButtonClick('web development')} width={70} height={70} className={"bg-white " + (selectedButton === 'webdevelopment' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <DevicePhoneMobileIcon onClick={() => handleButtonClick('software development')} width={70} height={70} className={"bg-white " + (selectedButton === 'software development' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CircleStackIcon onClick={() => handleButtonClick('programming')} width={70} height={70} className={"bg-white " + (selectedButton === 'programming' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />
                    <CloudIcon onClick={() => handleButtonClick('machine learning')} width={70} height={70} className={"bg-white " + (selectedButton === 'machine learning' ? 'border-b-2 border-orange fill-orange' : '') + " pb-2 block sm:hidden"} />

                </div>

                <div>
                    <div className="mx-auto max-w-7xl">
                        <div className="flex gap-5 flex-wrap">
                            {nameElements.length > 0 ? (
                                nameElements
                            ) : (
                                <p>No data to show</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NamesList;




