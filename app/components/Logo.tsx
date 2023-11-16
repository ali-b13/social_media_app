import React from 'react'
import { Rammetto_One } from "next/font/google";
const rammeto = Rammetto_One({ weight: "400", subsets: ["latin"] });
const Logo = ({color}:{color:string}) => {
  return <div  className={`${rammeto.className}  p-1 text-sm sm:text-lg text-[${color}] `}>Go Rock</div>;
}

export default Logo