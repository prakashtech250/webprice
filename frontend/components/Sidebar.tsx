'use client'

import React from 'react'
import Navbar from './Navbar'
import { Button } from './ui/button'
import { LayoutDashboard, LucideIcon, Search, Star } from 'lucide-react'
import { usePathname} from 'next/navigation'
import Link from 'next/link'
import { Separator } from '@radix-ui/react-dropdown-menu'

interface Menu {
  title: string;
  logo: LucideIcon;
  link: string;
}

const MenuList: Menu[] = [
  {title: 'Dashboard', logo:LayoutDashboard, link:'/dashboard'},
  {title: 'Search', logo:Search, link:'/search'},
  {title: 'Reviews', logo:Star, link:'/reviews'},
  {title: 'Account', logo:Star, link:'/account'},
  {title: 'Setting', logo:Star, link:'/Setting'},
  {title: 'Billing', logo:Star, link:'/billing'}
]

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className='w-[300px] border-r h-screen'>
        <div className='flex flex-col m-4 gap-4'>
          {MenuList.map((menu, index)=>
          <Link href={menu.link} scroll={false} key={index}>
            <Button variant={menu.link === pathname? "secondary": "ghost"} className=' text-md flex justify-between w-full'>
              <span>{React.createElement(menu.logo)}</span>
              {menu.title}
              {/* <Separator/> */}
              </Button>  
          </Link>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar