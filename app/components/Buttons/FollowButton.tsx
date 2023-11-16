import React from 'react'
interface FollowProps{
    onClick:()=>void;
    title:string,
    isUnfollow?:boolean
    className?:string
}
const FollowButton:React.FC<FollowProps> = ({onClick,title,isUnfollow,className}) => {
  return (
    <button
      className={`${className} ${
        isUnfollow ? "bg-black text-white " : "bg-blue-400 text-white"
      } text-sm rounded-lg w-[40%] text-center  p-1 self-start`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default FollowButton