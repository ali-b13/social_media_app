import React from 'react'
import { Rammetto_One } from "next/font/google";
const rammeto = Rammetto_One({ weight: "400", subsets: ["latin"] });
const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className={` ${rammeto.className} flex flex-row w-full`}>
        {children}
    </div>
  )
}

export default Container