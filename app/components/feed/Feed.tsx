"use client";
import React, { useEffect, useState } from 'react'

import StroyList from '../story/StroyList';
import PostList from './PostList';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
interface USERI{
  user:User
}

const Feed:React.FC<USERI> = ({user}) => {
 const [userfollowers,setUserFollowers]=useState([])
 const [isLoading,setIsLoading]=useState(true)
 const router=useRouter()
 const handleUserFollowers=async()=>{
  const res = await fetch(`/api/feed/follow?userId=${user.id}`, {
    method: "GET",
  });
  const data=await res.json()
   setIsLoading(false)
  setUserFollowers(data.followingIds)
 }
  useEffect(()=>{
    if(user){
      handleUserFollowers()

    }
  },[user])
  if(!isLoading&&userfollowers.length<1){
    router.push('/follow_users')
  }
  return (
    <div className='w-full text-white flex flex-col  items-center '>
     <StroyList/>
     <PostList user={user}/>
     
    </div>
  )
}

export default Feed