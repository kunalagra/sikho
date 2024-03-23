'use client'

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import DateTimePicker from "react-datetime-picker";

const IBanner = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <main className='banner-image'>
                <div className="relative px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
                                Empower Students to Build <br /> the Future with Tech
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-black">
                                Teach skills with your courses.
                            </p>
                            <div className="mt-5">
                                <button className="w-[200px] bg-purple-1 hover:bg-purple-2 text-white font-bold py-4 px-3 rounded" onClick={() => setIsOpen(true)}>
                                    Create a new plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <NewPlanModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}


const NewPlanModal = ({ isOpen, setIsOpen }) => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailImg, setThumbnailImg] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [modules, setModules] = useState([]);

    const handleThumbnailChange = (e) => {
        setThumbnailImg(e.target.files[0]);
        console.log(e.target.files[0]);
        setThumbnailImg(URL.createObjectURL(e.target.files[0]));
    }

    const handleStartDateChange = (e) => {
        if (new Date(e.target.value) > new Date()) {
            setStartDate(e.target.value);
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                        <div className="w-full max-w-xl space-y-8">
                                            <div>
                                                <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
                                                    New Course Plan
                                                </h2>
                                            </div>
                                            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={() => {}}>
                                                <input type="hidden" name="remember" defaultValue="true" />
                                                <div className="flex flex-col gap-2">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            required
                                                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Title"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <textarea
                                                            required
                                                            rows={5}
                                                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm resize-none"
                                                            placeholder="Description"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="number"
                                                            required
                                                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Price (in ₹)"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                        <p>Thumbnail</p>
                                                        {thumbnailImg && (
                                                            <img 
                                                                src={thumbnailImg}
                                                                alt={"thumbnail"}
                                                                className="w-full h-[200px] object-contain rounded-lg mt-3"
                                                            />
                                                        )}
                                                        <input type="file" onChange={handleThumbnailChange} className="w-full text-sm mt-3" />
                                                    </div>
                                                    <div className="flex gap-4 items-center rounded-md border border-gray-300 px-3 py-2 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                        <p className="text-gray-500">Start Date</p>
                                                        <input type="date" onChange={handleStartDateChange} value={startDate} />
                                                    </div>
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-1 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Create
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
    )
}

export default IBanner;
