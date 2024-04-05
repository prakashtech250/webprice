"use client"

import React, { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import Link from 'next/link'
import NavbarMobile from './Navbar-mobile'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
  return (
    <>
        <nav className='flex border rounded-sm bg-background h-16'>
            <div className='text-3xl text-bold antialiased m-4 px-4 w-full'>
                <Link href='/'>
                Web<span className='text-primary font-extrabold'>Price</span>
                </Link>
            </div>
            <div className='flex items-center gap-2 justify-center p-4'>
            <ModeToggle/>
            {isMobile ? <NavbarMobile/>: 
                <>
                <LoginLink><Button>Sign In</Button></LoginLink>
                
                <RegisterLink><Button variant="outline">Sign Up</Button></RegisterLink>  
                </>  
            }
            </div>
        </nav>
    </>
  )
}

export default Navbar