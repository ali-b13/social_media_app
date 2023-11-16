"use client"
import Image from 'next/image'
import React, { useState } from 'react'
interface UserProps{
    user:{
        name:string,
    src:string
    }
}

const StoryItem :React.FC<UserProps>= ({user}) => {
 
  return (
    <div>
      <div className="bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full">
        <div className="bg-white rounded-full p-[1.5px] flex items-center justify-center">
          {" "}
          <Image
            src={user.src}
            className="h-14 w-14 rounded-full bg-black"
            alt="story"
          />
        </div>
      </div>
      <div className="truncate text-xs w-16 text-neutral-700  font-roboto text-center">
        {user.name}
      </div>
    </div>
  );
}

export default StoryItem