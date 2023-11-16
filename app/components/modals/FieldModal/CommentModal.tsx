import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
interface CommentProps{
    isOpen:boolean,
    handleOnClose:()=>void;
    handleSubmit:()=>void;
    body:React.ReactNode
}
const CommentModal:React.FC<CommentProps> = ({isOpen,handleOnClose,handleSubmit,body}:any) => {
     const [showModal, setShowModal] = useState(isOpen);

     useEffect(() => {
       setShowModal(isOpen);
     }, [isOpen]);
     const handleClose = useCallback(() => {
       setShowModal(false);

       setTimeout(() => {
         handleOnClose();
       }, 300);
     }, [showModal]);
    //  const handleSubmit = useCallback(() => {
    //    if (disabled) return null;
    //    onSubmit();
    //  }, [disabled, onSubmit]);
    if(!isOpen)return null;
  return (
    <>
      <div
        className="fixed
      overflow-x-hidden z-50 
      overflow-y-auto inset-0 flex
      justify-center items-center
      bg-neutral-700/70 outline-none
       focus:outline-none"
      >
        <div
          className="
      relative
       min-w-[90%]
       md:w-4/6
       lg:w-3/6
       xl:w-2/5
       my-6
       mx-auto
       min-h-[40rem]
       md:h-auto
       xl:h-auto
       "
        >
          {/* Content container */}
          <div
            className={`
        translate
        duration-300
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}
        `}
        
          >
            <div
              className="
            translate
             h-full
             md:h-auto
             lg:h-auto
             border-0
             rounded-lg
             relative
             flex-col
             w-full
             bg-white
             outline-none
             focus:outline-none
             
             "
            >
              {/* Modal Header  */}
              <div
                className="
              relative 
              flex 
              items-center
               justify-center 
               p-4 rounded-t 
               "
              >
                <button className="absolute right-0 p-1  transition outline-none focus:outline-none hover:opacity-70 border-0 ">
                  <IoMdClose color="gray" onClick={handleOnClose} size={18} />
                </button>
              </div>
              {/* body  */}
              <div className="relative  flex-auto  ">{body}</div>
              {/* Footer  */}
              <div className="flex flex-col gap-2 p-6">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentModal