'use client'

import React from 'react'
import Navbar from './Navbar'
import { Button } from './ui/button'
import { usePathname} from 'next/navigation'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { ToolsMenu, UserMenu } from './MenuList'
import { useState, useEffect } from 'react'

const Sidebar = () => {
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
  const pathname = usePathname();
  return (
    <>
      {!isMobile && 
      <aside className='w-[360px] border rounded-lg bg-card'>
        <div className='flex flex-col m-4 gap-2'>
          {ToolsMenu.map((menu, index)=>
          <Link href={menu.link} scroll={false} key={index}>
            <Button variant={menu.link === pathname? "default": "ghost"} className='text-md flex justify-between w-full rounded-full'>
              <span>{React.createElement(menu.logo)}</span>
              {menu.title}
              </Button>  
          </Link>
          )}
          </div>
        <div className='flex flex-col m-4 pt-4 gap-2 border-t-2'>
          {UserMenu.map((menu, index)=>
          <Link href={menu.link} scroll={false} key={index}>
            <Button variant={menu.link === pathname? "default": "ghost"} className='text-md flex justify-between w-full rounded-full'>
              <span>{React.createElement(menu.logo)}</span>
              {menu.title}
              </Button>  
          </Link>
          )}
        </div>
      </aside>
    }
    </>
  )
}

export default Sidebar