import { NextRequest, NextResponse } from "next/server"

export const GET =async(req:NextRequest)=>{
    console.log("got inside")
    const userId=req.nextUrl.searchParams.get("userId") as string
    const user=await prisma?.user.findUnique({where:{id:userId}})
    console.log(user,'user')
    if(user){
        const following=await prisma?.follower.findMany({where:{userId:user.id},include:{follower:true,}});

        return NextResponse.json({message:"got it",following:following})
    }
  
}