"use client"
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react'
import { BiBadgeCheck } from 'react-icons/bi';
import img from "../../public/img/user_default1.jpg";
import FollowButton from './Buttons/FollowButton';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface UserInterface {
  handleUnfollow?: (user: any) => void;
  handleFollow?: (user: any) => void;
  user: any;
  width?: number;
  height?: number;
  isAddOrRemove?: boolean;
  isFollowed?: boolean;
  isProfile?:boolean
}
const User:React.FC<UserInterface> = ({user,width,height,handleFollow,handleUnfollow,isAddOrRemove,isFollowed,isProfile}) => {
    
  const [isFollowedUser,setIsFollowed]=useState(isFollowed)
   useEffect(()=>{
      setIsFollowed(isFollowed)
   },[isFollowed])
    const handleOnClickFollow=async()=>{
      setIsFollowed(true);
         if (handleFollow) {
           handleFollow(user);
         }
    }
    const handleOnClickUnFollow = async () => {
    
      if(handleUnfollow){
        setIsFollowed(false)
        handleUnfollow(user)
      }
    };
    const showProfile=true;
    const router=useRouter()
    const handleProfilePage=useCallback(()=>{
      router.push(`/main/profile/${user?.id}`)
    },[showProfile])
  return (
    <div className="w-full flex justify-between items-center align-middle">
      <div className="flex gap-2 mb-2">
        <Link href={`/main/profile/${user?.id}`}>
          <Image
            // onClick={handleProfilePage}
            className="border-2  rounded-full  space-2 object-contain "
            src={user?.image ? user.image : img}
            width={width ? width : 40}
            height={height ? height : 40}
            alt="image"
          />
        </Link>
        <div className="flex flex-col ">
          <div className="flex gap-2 items-center">
            <div className={`text-neutral-900   ${isProfile?"text-lg":"text-xs"}  truncate font-roboto font-extrabold`}>
              {user?.name}
            </div>
            <BiBadgeCheck fill="#33bfff" size={isProfile?22:18} />
          </div>
          <div className={`font-semibold  ${isProfile?"text-lg":"text-xs"} truncate text-neutral-400`}>
            {user?.username}
          </div>
        </div>
      </div>
      {isAddOrRemove ? (
        isFollowedUser ? (
          <FollowButton
          
            isUnfollow
            title="Unfollow"
            onClick={handleOnClickUnFollow}
          />
        ) : (
          <FollowButton title="Follow" onClick={handleOnClickFollow} />
        )
      ) : null}
    </div>
  );
}

export default User