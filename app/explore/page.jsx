"use client";

import Filters from "@/components/Filters/Filters";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain")? searchParams.get("domain").split("-").join(" ") : "";
  const tech = searchParams.get("tech")? searchParams.get("tech").split("-").join(" ") : "";
    const keyword = searchParams.get("keyword")? searchParams.get("keyword").split("-").join(" ") : "";
    const filterkey = searchParams.get("filterkey");
    const filtervalue = searchParams.get("filtervalue");
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  // searchParams.set('')

  const fetchCourses = async () => {
    const res = await fetch("/api/plans");
    const data = await res.json();
    let finalData = [];
    if(keyword){
      finalData = data.filter(course => {
        return course.title.toLowerCase().includes(keyword) || course.domain.toLowerCase().includes(keyword);
      });
    } else {
      if (domain) {
        finalData = data.filter(course => {
          return course.domain.toLowerCase()===domain
        });
      } else {
        finalData = data;
      }
    }

    if (filterkey==='price') {
      if (filtervalue==='low-to-high') {
        finalData = finalData.toSorted((a, b) => {
          console.log(a.price, b.price);
          return a.price - b.price
        })
      } else if (filtervalue==='high-to-low') {
        finalData = finalData.toSorted((a, b) => b.price - a.price)
      }
    }
    else if (filterkey==='rating') {
      if (filtervalue==='high-to-low') {
        finalData.toSorted((a, b) => b.rating - a.rating)
      } else if (filtervalue==='low-to-high') {
        finalData.toSorted((a, b) => a.rating - b.rating)
      }
    }

    setCourses(finalData);
  };

  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  return (
    <div className="w-full bg-lightpink-1">
      <div className="max-w-7xl py-16 px-2 mx-auto">
        <h2 className="h2-bold mb-2 text-center">Explore Courses</h2>
        {/* <p className="mb-3 text-center"> */}
          {/* for '{domain} */}
          {/* {tech ? " ("+tech+")" : ""}' */}
        {/* </p> */}
        <Filters mydomain={domain} mytech={tech} mykeyword={keyword}  />

        <div className="min-[50vh] flex gap-5 flex-wrap justify-center">
          {courses.map((course, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => router.push(`/courses/${course._id}`)}
            >
              <div className="w-[350px] text-lg sm:text-sm bg-slate-100 p-3 rounded-lg">
                <div className="aspect-w-1 aspect-h-1 h-[200px]  overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="mt-6 block font-normal text-gray-900">
                    {course.domain}
                  </div>
                  <div className="mt-6 block text-lg font-semibold text-green border-solid border-2 border-green rounded-md px-1">
                    ₹ {course.price}
                  </div>
                </div>
                <p
                  aria-hidden="true"
                  className="mt-2 mb-5 text-xl font-semibold line-clamp-2"
                >
                  {course.title}
                </p>

                <div className="flex justify-between border-solid border-2 border-grey500 rounded-md p-2">
                  <p>{course.totalClasses} Classes</p>
                  <div className="flex flex-row space-x-4">
                    <div className="flex">
                      <img src={"/assets/courses/account.svg"} alt="circle" />
                      <p className="text-lightgrey ml-1">120</p>
                    </div>
                    <div className="flex">
                      <img src={"/assets/courses/Star.svg"} alt="star" />
                      <p className="ml-1">{course.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <p>No courses found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
