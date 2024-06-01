import React from 'react'
import { UserMenu, ToolsMenu } from './MenuList'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SheetClose } from './ui/sheet'

const SidebarMobile = () => {
    const pathname = usePathname()
  return (
    <>
        <div className='flex flex-col m-4 gap-2'>
          {ToolsMenu.map((menu, index)=>
          <Link href={menu.link} scroll={false} key={index}>
            <Button variant={menu.link === pathname? "secondary": "ghost"} className='grow text-md flex justify-between w-full'>
              <span>{React.createElement(menu.logo)}</span>
              {menu.title}
              </Button>  
          </Link>
          )}
          </div>
        <div className='flex flex-col m-4 pt-4 gap-2 border-t-2'>
          {UserMenu.map((menu, index)=>
          <Link href={menu.link} scroll={false} key={index}>
            <Button variant={menu.link === pathname? "secondary": "ghost"} className=' text-md flex justify-between w-full'>
              <span>{React.createElement(menu.logo)}</span>
              {menu.title}
              </Button>  
          </Link>
          )}
        </div>
    </>
  )
}

export default SidebarMobile