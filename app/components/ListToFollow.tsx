"use client"
import React, { useEffect, useState } from 'react'
import FollowingList from './feed/FollowingList';
import RippleButton from './Buttons/RippleButton';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/navigation';

const ListToFollow = ({user}:any) => {
    const router=useRouter()
     const [followings, setFollowings] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [numOfFollowers,setNumOfFollowers]=useState(0)
     const handleVerfiyUserFollow=async()=>{
        if(numOfFollowers>=1){
            router.push('/')
        }
     }
    const fetchFollowing = async () => {
      const res = await fetch(`/api/feed/follow?userId=${user?.id}`, {
        method: "Get",
      });
      const data = await res.json();
      if (res.status == 200) {
        setFollowings(data.followingIds);
        setIsLoading(false);
      }
    };
    useEffect(()=>{
        if(user){

            fetchFollowing()
        }
    },[user])
    if(isLoading){
        return <Skeleton width={500} height={500}/>
    }
  return (
    <>
      {!isLoading && followings.length == 0 && (
        <div className="w-[60%] flex flex-col gap-2">
          <div className="text-neutral-500 p-3 text-xxl">
            Follow at least 4 Account
          </div>
          <FollowingList user={user} setNumOfFollowers={setNumOfFollowers}/>
          <RippleButton
            onClick={() => handleVerfiyUserFollow()}
            disabled={numOfFollowers<1?true:false}
            name="Contine"
            className="bg-blue-600 text-white w-[70%] self-center "
          />
        </div>
      )}
    </>
  );
}

export default ListToFollow