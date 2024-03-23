// 'use client';

import NavContent from './NavContent';
import { useSession } from "next-auth/react";


const Navbar = () => {

    const { data: session } = useSession();

    return (
        <NavContent session={session} />
    )
}

export default Navbar;
