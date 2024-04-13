"use client"

import React, { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import Link from 'next/link'
import NavbarMobile from './Navbar-mobile'
import AuthButton from './AuthButton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import LanguageToggle from './LanguageToggle'

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
            {/* <LanguageToggle/> */}
            <ModeToggle/>
            {isMobile ? <NavbarMobile/>: 
                <AuthButton/>
            }
            </div>
        </nav>
    </>
  )
}

export default Navbar