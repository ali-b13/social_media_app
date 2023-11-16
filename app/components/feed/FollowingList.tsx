"use client"
import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import User from '../User';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const FollowingList = ({ user, setNumOfFollowers }: any) => {
  const [usersToFollow, setUsersToFollow] = useState([]);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [followingIds, setFollowingIds] = useState<any>([]);
  useEffect(() => {
    const fetchFollowingIds = async () => {
      const userId = user?.id;
      try {
        if (userId) {
          // Check if user and user.id are not undefined
          const res = await axios.get("/api/feed/follow", {
            params: { userId },
          });
          
          const data = await res.data;
         
          setFollowingIds(data.followingIds);
        }
      } catch (error) {
        
      }
    };
    fetchFollowingIds();
  }, [user]);
 

  const handleFollow = async (user: any) => {
    const data = {
      userId: session?.user.id,
      followerId: user.id,
    };
    const res = await axios.post("/api/feed/follow", data);
     if (res.status == 200 && setNumOfFollowers) {
       setNumOfFollowers((prev: number) => prev + 1);
     }
    const receivedData = await res.data;
    
  };
  const handleUnfollow = async (user: any) => {
    const data = {
      userId: session?.user.id,
      followerId: user.id,
    };
    const res = await axios.put("/api/feed/follow", data);
    if (res.status == 200 && setNumOfFollowers) {
      setNumOfFollowers((prev: number) => prev - 1);
    }
    const receivedData = await res.data;

  };
  useEffect(() => {
    const fetchUsersToFollow = async () => {
      const res = await fetch(`/api/user?userId=${user.id}`, { method: "GET" });
      const data = await res.json();
      if (res.status == 200) {
        setUsersToFollow(data.users);
        setIsLoading(false);
      }
    };
    fetchUsersToFollow();
  }, [user]);
 
  return (
    <div className=" w-full flex items-center   flex-col">
      {usersToFollow.map((user: any) => {
        return (
          <div key={user.id} className="flex justify-between w-full items-center m-2">
            <User
              key={user?.id}
              user={user}
              isFollowed={followingIds.includes(user?.id)}
              isAddOrRemove
              handleUnfollow={handleUnfollow}
              handleFollow={handleFollow}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FollowingList