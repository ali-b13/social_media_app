import React, { useEffect, useState } from 'react'
import User from '../User'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@mui/material';
import axios from 'axios';

const ListUsers = ({users}:any) => {
  const {data:session}=useSession();
  const [isLoading,setIsLoading]=useState(true);
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [followingIds, setFollowingIds] = useState<any>([]);
  useEffect(() => {
    const fetchFollowingIds = async () => {
      const userId = session?.user.id;
      try {
        if (userId) {
          // Check if user and user.id are not undefined
          const res = await axios.get("/api/feed/follow", {
            params: { userId },
          });

          const data = await res.data;
          setIsLoading(false)

          setFollowingIds(data.followingIds);
        }
      } catch (error) {}
    };
    fetchFollowingIds();
  }, [session?.user]);

  const handleFollow = async (user: any) => {
    const data = {
      userId: session?.user.id,
      followerId: user.id,
    };
    const res = await axios.post("/api/feed/follow", data);
    
    const receivedData = await res.data;
  };
  const handleUnfollow = async (user: any) => {
    const data = {
      userId: session?.user.id,
      followerId: user.id,
    };
    const res = await axios.put("/api/feed/follow", data);
   
    const receivedData = await res.data;
  };
 
  return (
    <div className='min-h-[20vh] overflow-y-auto'>

        {
          isLoading?<Skeleton width={'100%'} height={'2rem'}/>:
        users?.map((user:any)=>{
            return <User 
            isAddOrRemove 
            handleUnfollow={handleUnfollow} 
             handleFollow={handleFollow} 
            isFollowed={followingIds.includes(user.id)} user={user}/>
        })
        
        }
    </div>
  )
  
}

export default ListUsers