import Image from 'next/image'
import React from 'react'
interface ProfileProps{
    src?:string
    height:number
    width:number
}
import userProfile from '@/public/svg/userProfile.svg'
const ProfileIcon :React.FC<ProfileProps>= ({src,width,height}) => {
  return <Image height={height} width={width} className='rounded-full p-1 border-2 border-black' alt="user" src={src ? src : userProfile} />;
  
}

export default ProfileIcon