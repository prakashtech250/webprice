// import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const AuthButton = () => {
    // const { isAuthenticated, isLoading } = useKindeBrowserClient();
    const isAuthenticated = false
    // if (isLoading) return <div>Loading...</div>;
    return ( 
        isAuthenticated ? 
        <>
            <Link href={"/logout"}><Button className='rounded-full'>Log Out</Button></Link>
        </> : <>
            <Link href={"/login"}><Button className='rounded-full'>Sign In</Button></Link>
            <Link href={"/signup"}><Button variant="outline" className='rounded-full border-primary border-2'>Sign Up</Button></Link>  
        </>
    )
}

export default AuthButton