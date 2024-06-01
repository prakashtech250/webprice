"use client"

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import Navbar from './Navbar'
import SidebarMobile from './Sidebar-mobile'
import { ToolsMenu, UserMenu } from './MenuList'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import AuthButton from './AuthButton'

const NavbarMobile = () => {
    const pathname = usePathname();
  return (
    <>
        <Sheet>
            <SheetTrigger>
                <Menu className='mx-4'/>
            </SheetTrigger>
            <SheetContent side='left'>
                <div>
                <div className='flex flex-col m-4 gap-2'>
                    {ToolsMenu.map((menu, index)=>
                    <Link href={menu.link} scroll={false} key={index}>
                        <SheetClose asChild>
                        <Button variant={menu.link === pathname? "secondary": "ghost"} className='grow text-md flex justify-between w-full'>
                        
                        <span>{React.createElement(menu.logo)}</span>
                        {menu.title}
                        </Button>  
                        </SheetClose>
                    </Link>
                    )}
                    </div>
                    <div className='flex flex-col m-4 pt-4 gap-2 border-t-2'>
                    {UserMenu.map((menu, index)=>
                    <Link href={menu.link} scroll={false} key={index}>
                        <SheetClose asChild>
                        <Button variant={menu.link === pathname? "secondary": "ghost"} className=' text-md flex justify-between w-full'>
                        <span>{React.createElement(menu.logo)}</span>
                        {menu.title}
                        </Button>  
                        </SheetClose>
                    </Link>
                    )}
                    </div>
                </div>
                <div className='flex justify-center m-6 gap-5'>
                        <AuthButton/>
                    </div>
            </SheetContent>
        </Sheet>
    </>
  )
}

export default NavbarMobile