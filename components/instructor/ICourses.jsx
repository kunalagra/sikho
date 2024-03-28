"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// const courses = [
//     {
//         "title": "HTML, CSS, Javascript & React Development",
//         "price": 250,
//         "domain": "Programming",
//         "description": "This course will walk you through HTML, CSS & JS development.",
//         "totalclasses": 12,
//         "time": 60,
//         "thumbnail": "/assets/courses/1_reactandhtml.jpg",
//         "author": "James Bond",
//         "modules": [
//           {
//             "id": 1,
//             "title": "Module 1",
//             "description": "Description of Module 1",
//             "lessons": [
//               {
//                 "title": "Lesson 1",
//                 "content": "Content of Lesson 1"
//               },
//               {
//                 "title": "Lesson 2",
//                 "content": "Content of Lesson 2"
//               }
//             ]
//           },
//           {
//             "id": 2,
//             "title": "Module 2",
//             "description": "Description of Module 2",
//             "lessons": [
//               {
//                 "title": "Lesson 3",
//                 "content": "Content of Lesson 3"
//               },
//               {
//                 "title": "Lesson 4",
//                 "content": "Content of Lesson 4"
//               }
//             ]
//           }
//         ]
//       },
    
//       {
//         "title": "Backend Development With NodeJS",
//         "price": 1250,
//         "domain": "Programming",
//         "description": "This course will teach you the backend development with project buliding will give a good hands on experience on nodejs.",
//         "totalclasses": 22,
//         "time": 60,
//         "thumbnail": "/assets/courses/2_nodebackend.jpg",
//         "author": "James Bond",
//         "modules": [
//           {
//             "id": 1,
//             "title": "Module 1",
//             "description": "Description of Module 1",
//             "lessons": [
//               {
//                 "title": "Lesson 1",
//                 "content": "Content of Lesson 1"
//               },
//               {
//                 "title": "Lesson 2",
//                 "content": "Content of Lesson 2"
//               }
//             ]
//           },
//           {
//             "id": 2,
//             "title": "Module 2",
//             "description": "Description of Module 2",
//             "lessons": [
//               {
//                 "title": "Lesson 3",
//                 "content": "Content of Lesson 3"
//               },
//               {
//                 "title": "Lesson 4",
//                 "content": "Content of Lesson 4"
//               }
//             ]
//           }
//         ]
//       },
    
//       {
//         "title": " Complete Python Bootcamp From Scratch",
//         "price": 799,
//         "domain": "Programming",
//         "description": "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games.",
//         "totalclasses": 25,
//         "time": 60,
//         "thumbnail": "/assets/courses/3_python.jpg",
//         "author": "James Bond",
//         "modules": [
//           {
//             "id": 1,
//             "title": "Module 1",
//             "description": "Description of Module 1",
//             "lessons": [
//               {
//                 "title": "Lesson 1",
//                 "content": "Content of Lesson 1"
//               },
//               {
//                 "title": "Lesson 2",
//                 "content": "Content of Lesson 2"
//               }
//             ]
//           },
//           {
//             "id": 2,
//             "title": "Module 2",
//             "description": "Description of Module 2",
//             "lessons": [
//               {
//                 "title": "Lesson 3",
//                 "content": "Content of Lesson 3"
//               },
//               {
//                 "title": "Lesson 4",
//                 "content": "Content of Lesson 4"
//               }
//             ]
//           }
//         ]
//       },
// ];



const ICourses = () => {   

  const navigate = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/plans');
      const data = await response.json();
      setCourses(data);
    };
    fetchData();
  }, []);

    const nameElements = courses.map((name, index) => (

        <div key={index}>
            <div className=" text-lg sm:text-sm bg-slate-100 p-3 rounded-lg">
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
                <p aria-hidden="true" className="mt-2 mb-5 text-2xl font-semibold line-clamp-2">
                    {name.title}
                </p>

                <div className='flex justify-between border-solid border-2 border-grey500 rounded-md p-2'>
                    <p>{name.totalclasses} Classes</p>
                    <div className='flex flex-row space-x-4'>
                        <div className='flex'>
                            <img src={'/assets/courses/account.svg'} alt="circle" />
                            <p className='text-lightgrey ml-1'>120</p>
                        </div>
                        <div className='flex'>
                            <img src={'/assets/courses/Star.svg'} alt="star" />
                            <p className='ml-1'>{name.rating}</p>
                        </div>
                    </div>
                </div>

                <button className="bg-purple-1 text-white py-3 w-full rounded-lg mt-2"
                    onClick={() => {
                        navigate.push(`/courses/${name._id}`);
                    }}
                >
                    Edit
                </button>

            </div>
        </div>
    ));


    return (
        <div>
            <div id='courses-section' className="mx-auto max-w-7xl py-12 px-4 sm:px-6">

                <div className='sm:flex justify-between items-center pb-6'>
                    <h2 className="h1-bold">My Courses</h2>
                    <div>
                        <button className="bg-transparent hover:bg-purple-1 text-purple font-medium hover:text-white py-3 px-4 border border-purple hover:border-transparent rounded">
                            View all
                        </button>
                    </div>
                </div>

                <div>
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-8">
                            <div className="col-start-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
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
        </div>
    );
}

export default ICourses;




