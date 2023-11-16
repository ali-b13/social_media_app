import React from 'react'
import Logo from '../Logo';
import Image from 'next/image';
import { Rammetto_One } from "next/font/google";
import loginSvg from "../../public/svg/login1.svg";
import mobileWaveUp from "../../../public/svg/mobileWaveUp.svg";
import mobileWave from "../../../public/svg/mobileWave.svg";
const rammeto = Rammetto_One({ weight: "400", subsets: ["latin"] });
const MobileView = ({children}:{children:React.ReactNode}) => {
  return (
    <div
      className={`${rammeto.className}   flex flex-col justify-start items-center h-screen relative`}
    >
      <Logo color='red' />
      <Image className=" relative top-0" src={mobileWave} alt="svg" />
      <div className="w-full ">
        {children}
      </div>
      
    </div>
  );
}

export default MobileView