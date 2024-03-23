"use client"
import { useState } from 'react';
import Dropdownone from './Dropdownone';
import Dropdowntwo from './Dropdowntwo';
import Link from 'next/link';


const Banner = () => {
    
    const techs = {
        'Web Development': ['Flask', 'HTML/CSS/JS', 'ReactJS', 'AngularJS', 'All'],
        'Full Stack Development': ['MERN Stack', 'MEAN Stack', 'All'],
        'Programming': ['Python', 'C/C++', 'Java', 'Javascript', 'All'],
        'Database': ['SQL', 'MongoDB', 'Firebase', 'All'],
        'Android Development': ['Flutter', 'React Native', 'Kotlin', 'All'],
        'Machine Learning': ['Python', 'R', 'All'],
        'Devops': ['Python', 'All'],
        'Software Development': ['Python', 'All'],
        'All': ['All']
    }

    const topics = Object.keys(techs);

    const [domain, setDomain] = useState('Web Development');
    const [tech, setTech] = useState('All');

    return (
        <main className='banner-image'>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
                            Advance your engineering <br /> skills with our courses
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-black">
                            Build skills with our courses and mentor from world-class companies.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <div className="hidden sm:block -space-x-2 overflow-hidden">
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </div>
                            <div className='bannerBorder sm:pl-8'>
                                <div className='flex justify-center sm:justify-start'>
                                    <h3 className='text-2xl font-semibold mr-2'>4.6</h3>
                                    <img src={'/assets/banner/Stars.svg'} alt="stars-icon" />
                                </div>
                                <div>
                                    <h3 className='text-sm'>Rated by 25k on google.</h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* DROPDOWN BUTTONS */}


                    <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                            <div className="col-span-3">
                                <Dropdownone topics={topics} selected={domain} setSelected={setDomain} />
                            </div>
                            <div className="col-span-3">
                                <Dropdowntwo techs={techs[domain]} selected={tech} setSelected={setTech} />
                            </div>
                            <div className="col-span-3 sm:col-span-2 mt-2">
                                <Link href={`/explore?domain=${domain.toLowerCase().split(' ').join('-')}&tech=${tech.toLowerCase().split(' ').join('-')}`}>
                                    <button className="bg-purple-1 w-full hover:bg-pruple-2 text-white font-bold py-4 px-3 rounded">
                                        Explore
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Banner;
