"use client"
import React, { useState } from 'react'
import { BiDotsHorizontal } from 'react-icons/bi';
import Item from './Item';
import User from '../User';
import Header from './Header';

const Profile = ({ user, currentUser }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(user.Posts);

  return (
    <div className="bg-black w-full  h-screen flex justify-start items-center">
      <div className="bg-white w-full h-full flex flex-col items-center ">
        
        {/* top section  */}
       <Header user={user} currentUser={currentUser}/>
        {/* posts  */}
    
        <div className="w-full max-h-max flex gap-6 items-center flex-col lg:flex-row lg:justify-start flex-wrap   lg:gap-3  border-t-2 p-4 ">
          {user.Posts.length < 1 ? (
            <div className="font-extrabold text-neutral-900 text-center w-full text-xl p-6">
              Has not published any post yet
            </div>
          ) : (
            user.Posts?.map((post: any) => {
              return <Item post={post} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile