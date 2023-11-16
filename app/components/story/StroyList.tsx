import React, { useRef, useState } from 'react'
import StoryItem from './StoryItem'
import user from '@/public/svg/userProfile.svg'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Skeleton } from '@mui/material';

const friends = [
  { name: "Ali Alamri", src: user },
  { name: "Ali Alamri", src: user },
  { name: "Ali Alamri", src: user },
  { name: "Ali Alamri", src: user },
  { name: "Ali Alamri", src: user },
  { name: "Ali Alamri", src: user },
  { name: "Ali Alamri", src: user },
  { name: "Ali Alamri", src: user },

];

const StroyList = () => {
  const [isLoading, setIsLoading] = useState(true);
    const [showLeft,setShowLeft]=useState(false)
    const [showRight, setShowRight] = useState(friends.length>7?true:false);
    const storiesRef=useRef<any>(null)
    const onScroll=()=>{
        if(storiesRef.current.scrollLeft>0){
           setShowLeft(true);
        }else{
            setShowLeft(false);
        }
        if(storiesRef.current.scrollLeft==storiesRef.current.scrollWidth-storiesRef.current.clientWidth){
            setShowRight(false);
        }else {
            setShowRight(true);
        }
    }
     if (isLoading) {
       return (
         <div className='flex gap-3 items-center'>
           <Skeleton className="rounded-full " width={50} height={50} />;
           <Skeleton className="rounded-full " width={50} height={50} />;
           <Skeleton className="rounded-full " width={50} height={50} />;
           <Skeleton className="rounded-full " width={50} height={50} />;
         </div>
       );
     }
  return (
    <div className="w-[80%]  max-w-[80%] relative ">
      <div
        onScroll={onScroll}
        ref={storiesRef}
        className=" flex justify-start items-start space-x-2  overflow-x-scroll w-full gap-3 border-gray-800 p-4 scroll-smooth z-20  scrollbar-hide "
      >
        {friends.map((user,inx) => (
          <StoryItem key={inx} user={user} />
        ))}
      </div>
      <div className="absolute top-[-8px] p-1 w-full h-full flex justify-between z-10 items-center">
        <FaArrowLeft
          onClick={() =>
            (storiesRef.current.scrollLeft =
              storiesRef.current.scrollLeft - 300)
          }
          className={` text-neutral-500/60 drop-shadow-lg outline-none select-none c ${
            showLeft ? "visible cursor-pointer" : "invisible cursor-none"
          }`}
          size={30}
        />

        <FaArrowRight
          onClick={() =>
            (storiesRef.current.scrollLeft =
              storiesRef.current.scrollLeft + 300)
          }
          className={`text-neutral-500/60 drop-shadow-lg filter outline-none select-none ${
            showRight ? "visible cursor-pointer" : "invisible cursor-none"
          }`}
          
          size={30}
        />
      </div>
    </div>
  );
}

export default StroyList