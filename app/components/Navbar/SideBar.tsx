"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logoImage from '@/public/svg/logo.svg'
import List from '../list/List'
import {FaArrowRight,FaArrowLeft} from 'react-icons/fa'
import { BiX} from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import Logo from '../Logo'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@mui/material'
const SideBar = () => {
  const router=useRouter();
  const [isLoading,setIsLoading]=useState(true);
  const {data:session}=useSession()
  const [toggleShowMenu,setToggleShowMenu]=useState(false);
  useEffect(()=>{
    if(session?.user){
      setIsLoading(false)
    }
  },[session])
  const onClickToggle=()=>{
    setToggleShowMenu(prev=>!prev)
  }
  if(isLoading){
    return <Skeleton width={70} height={"90vh"}/>
  }
  return (
    <div className=" w-full h-full flex flex-col m-3 items-start relative border-r-2 ">
      {toggleShowMenu ? (
        <Logo color="#6c63ff" />
      ) : (
        <Image
          className=" my-6 pt-4 self-start cursor-pointer"
          src={logoImage}
          alt="logo"
          height={40}
          width={40}
          onClick={() => router.push("/")}
        />
      )}
      <div
        onClick={onClickToggle}
        className={`absolute cursor-pointer top-0 ${
          toggleShowMenu ? "left-3/4" : "left-1/3  "
        }  `}
      >
        {toggleShowMenu ? (
          <FaArrowLeft fill="#808080"  />
        ) : (
          <FaArrowRight  fill="#808080" />
        )}
      </div>
      <List toggleMenu={toggleShowMenu} />
    </div>
  );
}

export default SideBar