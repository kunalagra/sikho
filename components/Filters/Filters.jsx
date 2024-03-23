"use client"
import { useState } from 'react';
import Dropdownfirst from './Dropdownfirst';
import Dropdownsec from './Dropdownsec';
import Link from 'next/link';


const Filters = () => {
    
    const techs = {
        'Price': ['Low To High', 'High to Low'],
        'Rating': ['Low To High', 'High to Low'],
        'Location': ['Delhi', 'Mumbai', 'Chennai', 'Bangaluru', 'Hydrabad', 'Kolkata','All'],
      
    }

    const topics = Object.keys(techs);

    const [domain, setDomain] = useState('Price');
    const [tech, setTech] = useState('All');

    return (
        <main className='banner-image'>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                    

                    {/* DROPDOWN BUTTONS */}


                    <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                            <div className="col-span-3">
                                <Dropdownfirst topics={topics} selected={domain} setSelected={setDomain} />
                            </div>
                            <div className="col-span-3">
                                <Dropdownsec techs={techs[domain]} selected={tech} setSelected={setTech} />
                            </div>
                            <div className="col-span-3 sm:col-span-2 mt-2">
                                <Link href={`/explore?domain=${domain.toLowerCase().split(' ').join('-')}&tech=${tech.toLowerCase().split(' ').join('-')}`}>
                                    <button className="bg-purple-1 w-full hover:bg-pruple-2 text-white font-bold py-4 px-3 rounded">
                                        Modify Search
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

export default Filters;
