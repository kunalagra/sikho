'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
const page = () => {

  const navigate = useRouter();
  const [title, setTitle] = useState('');
    const [individualPrice, setIndividualPrice] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailImg, setThumbnailImg] = useState(null);
    const [domain, setDomain] = useState('');
    const [time, setTime] = useState('');
    const [totalclasses, setTotalClasses] = useState('');

    const handleThumbnailChange = (e) => {
        setThumbnailImg(e.target.files[0]);
    }

    const handleCreate = async (e,data) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('thumbnail', thumbnailImg);
        formData.append('domain', data.domain);
        formData.append('time', data.time);
        formData.append('totalclasses', data.totalclasses)

        fetch('/api/plans', {
            method: 'POST',
            body: formData,
        })
        .then((res) => navigate.push('/'))
        .catch((err) => {
            console.log(err);
        })
    }


  return (
    <div className="bg-lightpink-1">
      <div className="flex min-h-full max-w-7xl items-center justify-center py-12 px-4 mx-auto">
        <div className="w-full max-w-3xl space-y-8 shadow-lg bg-white rounded-lg py-12 px-8">
          <div>
            <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
              New Course Plan
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={() => {}}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                  placeholder="Domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  required
                  rows={5}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500  resize-none"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-5">
                <input
                  type="number"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                  placeholder="Individual Price (in ₹)"
                  value={individualPrice}
                  onChange={(e) => setIndividualPrice(e.target.value)}
                />
                <input
                  type="number"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                  placeholder="Group Price (in ₹)"
                  value={ individualPrice ? Math.round(individualPrice/3): '' }
                  onChange={(e) => setIndividualPrice(e.target.value*3)}
                />
              </div>
              <div className="bg-white rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ">
                <p>Thumbnail</p>
                {thumbnailImg && (
                  <img
                    src={URL.createObjectURL(thumbnailImg)}
                    alt={"thumbnail"}
                    className="w-full h-[200px] object-contain rounded-lg mt-3"
                  />
                )}
                <input
                  type="file"
                  onChange={handleThumbnailChange}
                  className="w-full mt-3"
                />
              </div>
              <div>
                <input
                  type="Number"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                  placeholder="Total Lecture Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="Number"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                  placeholder="Total Classes"
                  value={totalclasses}
                  onChange={(e) => setTotalClasses(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-1 py-2 px font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={(e) => handleCreate(e,{ title, price: individualPrice, description, thumbnail, domain, time, totalclasses })}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
