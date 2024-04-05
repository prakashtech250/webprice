import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

const Navbar = () => {
  return (
    <>
        <nav className='flex border bg-background w-full h-16'>
            <div className='text-3xl text-bold antialiased m-4 px-4 w-full'>
                <Link href='/'>
                Web<span className='text-primary font-extrabold'>Price</span>
                </Link>
            </div>
            <div className='flex items-center gap-2 justify-center p-4'>
                {/* <DropdownMenu>
                    <DropdownMenuTrigger>
                        language
                    </DropdownMenuTrigger>
                </DropdownMenu> */}
                <ModeToggle />
                <Button>Sign In</Button>
                <Button variant="outline">Sign Up</Button>
            </div>
        </nav>
    </>
  )
}

export default Navbar