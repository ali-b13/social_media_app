import { NextResponse } from "next/server";

export const POST=async(req:Request)=>{
const {postId,userId,comment}=await req.json();
 const commentPost=await prisma?.comment.create({data:{userId,postId,comment},include:{user:true}})
 return NextResponse.json({message:"got it",commentPost})
}

// export const GET=async(req:Request)=>{
// const {postId,userId,comment}=await req.json();
//  const commentPost=await prisma?.comment.create({data:{userId,postId,comment}})
//  return NextResponse.json({message:"got it",commentPost})
// }