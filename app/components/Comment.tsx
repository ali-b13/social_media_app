import React from 'react'
import User from './User'
import { BiHeart, BiLike } from 'react-icons/bi';

const Comment = ({comment,user}:any) => {
 
  return (
    <div className="flex   gap-4 w-full h-fit">
      <div>
        {" "}
        <User user={user} />
      </div>
      <div className="flex justify-between w-[70%] items-end ">
        <div className="flex flex-col items-start">
          <div className="font-bold text-sm font-roboto ">
            {comment.comment}
          </div>
          <div className="flex justify-around gap-4 text-xs text-neutral-400">
            <div>1d</div>
            <div>120 likes</div>
          </div>
        </div>
        <div>
          <BiHeart className={""} size={18} />
        </div>
      </div>
    </div>
  );
}

export default Comment