import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST =async(req:NextRequest)=>{
  const {userId,followerId}=await req.json()
  
  console.log(followerId,'id',userId,'id of user')
  const follower =await prisma?.follower.create({data:{userId,followerId}})
  return  NextResponse.json({message:"followed successfully",follower})
}

export const PUT =async(req:NextRequest)=>{
  const {userId,followerId}=await req.json()
  
  console.log(followerId,'id',userId,'id of user')
  if(userId && followerId){
    const follower =await prisma?.follower.delete({where:{userId_followerId:{userId,followerId}}})
  return  NextResponse.json({message:"unfollowed successfully",follower})
  }
}

export const GET =async(req:NextRequest)=>{
    console.log("got inside")
    const userId=req.nextUrl.searchParams.get("userId") as string
    const user=await prisma?.user.findUnique({where:{id:userId}})
    console.log(user,'user')
    if(user){
        const following=await prisma?.follower.findMany({where:{userId:user.id},include:{follower:true}});
     const followingIds = following?.map(follower => follower.followerId);
        return NextResponse.json({message:"got it",followingIds:followingIds})
    }
}