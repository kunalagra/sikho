'use client'

import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation'

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Courses', href: '#courses-section', current: false },
    { name: 'Mentors', href: '#mentors-section', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NavContent = ({ session }) => {

    const userID = session && session.user? session.user._id : null;
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className="bg-lightpink-1 NavContent">
            <>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">

                            {/* LOGO */}

                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="block h-30px w-30px lg:hidden"
                                    src={'/assets/logo/Logo.svg'}
                                    alt="Courses-Logo"
                                />
                                <img
                                    className="hidden h-48px w-48px lg:block"
                                    src={'/assets/logo/Logo.svg'}
                                    alt="Courses-Logo"
                                />
                            </div>

                            {/* LINKS */}

                            <div className="hidden sm:ml-14 md:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? ' text-purple' : 'hover:text-purple',
                                                'px-3 py-4 text-15px font-medium space-links'
                                            )}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SIGNIN DIALOG */}
                        {!userID && (<Signdialog />)}


                        {/* REGISTER DIALOG */}

                        {!userID && (<Registerdialog />)}

                        {userID && (
                            <Link href='/my-classes' className='mr-3 underline'>
                                My Classes
                            </Link>
                        )}

                        {userID && pathname==='/' && (
                            <button
                                onClick={() => {signOut(); localStorage.clear();}}
                                className="text-15px font-medium text-purple hover:text-purple px-4 py-2 rounded-md border border-purple"
                            >
                                Sign Out
                            </button>
                        )}


                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}

                        <div className='block md:hidden'>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                        </div>

                        {/* DRAWER LINKS DATA */}

                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>

                    </div>
                </div>
            </>
        </Disclosure>
    )
}

export default NavContent;
