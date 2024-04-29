import { LayoutDashboard, LucideIcon, Search, Star, User, Settings, CreditCard, SeparatorHorizontal, ShoppingBag} from 'lucide-react'

interface Menu {
    title: string;
    logo: LucideIcon;
    link: string;  }


export const ToolsMenu: Menu[] = [
    {title: 'Dashboard', logo:LayoutDashboard, link:'/dashboard'},
    {title: 'Search', logo:Search, link:'/search'},
    {title: 'Reviews', logo:Star, link:'/reviews'},
    {title: 'Products', logo:ShoppingBag, link:'/products'}
  ]
  
export const UserMenu: Menu[] = [
  {title: 'Profile', logo:User, link:'/profile'},
  {title: 'Settings', logo:Settings, link:'/settings'},
  {title: 'Billing', logo:CreditCard, link:'/billing'}
]
