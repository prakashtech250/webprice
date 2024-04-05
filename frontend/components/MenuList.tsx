import { LayoutDashboard, LucideIcon, Search, Star, User, Settings, CreditCard, SeparatorHorizontal} from 'lucide-react'

interface Menu {
    title: string;
    logo: LucideIcon;
    link: string;
  }


export const ToolsMenu: Menu[] = [
    {title: 'Dashboard', logo:LayoutDashboard, link:'/dashboard'},
    {title: 'Search', logo:Search, link:'/search'},
    {title: 'Reviews', logo:Star, link:'/reviews'},
  ]
  
export const UserMenu: Menu[] = [
  {title: 'Account', logo:User, link:'/account'},
  {title: 'Settings', logo:Settings, link:'/settings'},
  {title: 'Billing', logo:CreditCard, link:'/billing'}
]