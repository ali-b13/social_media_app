"use client"
import React from 'react'
import Item from './Item'
import { CiHome, CiSearch,CiCompass1,CiMail,CiHeart, CiBadgeDollar, CiCircleMore, CiCirclePlus } from "react-icons/ci";
import {FaBars} from 'react-icons/fa'
import {AiOutlineBars} from 'react-icons/ai'
import ProfileIcon from '../ProfileIcon';
import useCreatePostModal from '@/app/hooks/useCreatePostModal';
import { useSession } from 'next-auth/react';
interface ListProps {
  toggleMenu:boolean
}
const List :React.FC<ListProps>= ({toggleMenu}) => {
   const {  onOpen } = useCreatePostModal();
   const {data:session}=useSession()
    const itemIcons = [
      {
        icon: CiHome,
        name: "Home",
        onClick: onOpen,
        path:"/main"
      },
      {
        icon: CiSearch,
        name: "Search",
        onClick: onOpen,
        path:"/search"
      },
      {
        icon: CiCompass1,
        name: "Explore",
        onClick: onOpen,
        path:"/explore"
      },
      {
        icon: CiMail,
        name: "Messages",
        onClick: onOpen,
        path:"/messages"
      },
      {
        icon: CiHeart,
        name: "Notification",
        onClick: onOpen,
        path:"/notifications"
      },

      {
        icon: CiCirclePlus,
        name: "Create",
        onClick: onOpen,
      },
      {
        icon: ProfileIcon,
        name: "Profile",
        onClick: onOpen,
        path:`/main/profile/${session?.user.id}`
      },
      {
        icon: AiOutlineBars,
        name: "More",
        onClick: onOpen,
      },
    ];;
  return (
    <div className='flex flex-col   gap-8 items-start'>
        
        {itemIcons.map(item=>{
            return <Item toggleMenu={toggleMenu} item={item} />;
        })}
       
    </div>
  )
}

export default List