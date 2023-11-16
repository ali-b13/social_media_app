
import { getServerSession } from "next-auth";
import { handler } from "../api/auth/[...nextauth]/route";
import prisma from '@/app/libs/prismaDB'
import axios from "axios";
const getSession=async()=>{
  return await getServerSession(handler)
}
export const getUser=async()=>{
  const session =await getSession();
  if(!session)return null;
   const user=await prisma.user.findUnique({where:{email:session?.user?.email as string}})
   return user;
   
}

export const getUserFollowers=async(userId:string)=>{
  const res=await fetch(`/api/feed/follow?userId=${userId}`,{method:"GET"});
  return res
}