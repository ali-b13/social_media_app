import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
interface ItemProps{
   item:{ icon:IconType,
    name:string,
    onClick:()=>void
    path?:string
   }
   toggleMenu:boolean
}
const Item: React.FC<ItemProps> = ({
  item: { icon: Icon, name ,onClick,path},
  toggleMenu,
}) => {
  const pathnanme=usePathname();
  const router=useRouter()
  const handleOnClick=useCallback(()=>{
    if(!path){
      onClick()
    }else{
      router.push(path)
    }
  },[pathnanme])
  return (
    <div onClick={handleOnClick} className="flex flex-row justify-start gap-3 items-center p-1 w-full cursor-pointer hover:bg-slate-200/70 rounded-lg">
      <Icon color={pathnanme==path?"blue":""} size={30} width={30} />
      {toggleMenu ? (
        <div className="  font-mono text-neutral-500   ">{name}</div>
      ) : null}
    </div>
  );
};

export default Item