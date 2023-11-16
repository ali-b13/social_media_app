"use client"
import Image from 'next/image'
import React from 'react'
import wave from '../../public/svg/waves.svg'
import upwave from '../../public/svg/upwave.svg'
const Sketch = ({svg}:any) => {
  return (
    <>
      <div className="md:flex flex-col  hidden align-middle justify-center  w-full h-screen relative">
        <div className="absolute top-0 ">
          <Image alt="waves" src={wave} />
        </div>
        <div className="flex self-center  bg-[#6b63ff98]  md:h-[25rem] md:w-[25rem]  lg:w-[30rem] h-[30rem] rounded-full  justify-center ">
          <div className="self-center bg-[#6c63ff] h-[25rem] w-[25rem] rounded-full flex justify-center">
            <Image
              className="sm:h-[22rem] w-[20rem] xl:w-[22rem] self-center "
              alt="waves"
              src={svg}
            />
          </div>
        </div>
        {/* <Image className="md:h-[50%] md:w-3/6 self-center " alt="waves" src={svg} /> */}
        <div className="absolute bottom-0">
          <Image className="" alt="waves" src={upwave} />
        </div>
      </div>
    </>
  );
}

export default Sketch