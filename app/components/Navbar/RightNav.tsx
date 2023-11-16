"use client";
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import FollowingList from '../feed/FollowingList';
import { Skeleton } from '@mui/material';
const RightNav = ({user}:any) => {
  const [users,setUsers]=useState([]);
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    const getAllUser=async()=>{
      if(user){
         const res = await fetch(`/api/user?userId=${user.id}`, {
           method: "GET",
         });

         if(res.status==200){

          const data = await res.json();
          setUsers(data.users);
          setIsLoading(false);

         }
         
      }
    }
    getAllUser()
  },[user])
   if(isLoading){
    return <Skeleton width={300} height={'100vh'}/>
   }
  return (
    <div className="w-full  h-full  gap-3 flex-col flex ">
      <div className="mx-4 mt-10 flex flex-row justify-around items-center ">
        <div onClick={()=>signOut()} className="font-semibold text-neutral-400 text-md">Suggested For You</div>
        <div className="text-neutral-800 text-xs hover:text-neutral-400 cursor-pointer font-bold">See All</div>
      </div>
      <FollowingList user={user}/>
      
    </div>
  );
}

export default RightNav