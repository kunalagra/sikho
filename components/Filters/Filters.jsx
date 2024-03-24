"use client"
import { useState } from 'react';
import Dropdownfirst from './Dropdownfirst';
import Dropdownsec from './Dropdownsec';
import Link from 'next/link';


const Filters = ({ mydomain, mytech, mykeyword }) => {
    
    const techs = {
        'Price': ['Low To High', 'High to Low', 'All'],
        'Rating': ['Low To High', 'High to Low', 'All'],
        'Location': ['Delhi', 'Mumbai', 'Chennai', 'Bangaluru', 'Hydrabad', 'Kolkata','All'],
      
    }

    const topics = Object.keys(techs);

    const [domain, setDomain] = useState('Price');
    const [tech, setTech] = useState('All');

    let finalLink = `/explore?`;

    if (mykeyword) {
        finalLink += `keyword=${mykeyword.toLowerCase()}&`
    } else {
        finalLink += `domain=${mydomain.toLowerCase().split(' ').join('-')}&tech=${mytech.toLowerCase().split(' ').join('-')}&`
    }

    finalLink += `filterkey=${domain.toLowerCase()}&filtervalue=${tech.toLowerCase().split(' ').join('-')}`;

    return (
        <main className='banner-image'>
            <div className="relative">
                <div className="mx-auto max-w-5xl my-3">
                    

                    {/* DROPDOWN BUTTONS */}


                    <div className="mx-auto max-w-4xl pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                            <div className="col-span-3">
                                <Dropdownfirst topics={topics} selected={domain} setSelected={setDomain} />
                            </div>
                            <div className="col-span-3">
                                <Dropdownsec techs={techs[domain]} selected={tech} setSelected={setTech} />
                            </div>
                            <div className="col-span-3 sm:col-span-2 mt-2">
                                <Link href={finalLink}>
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
