import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismaDB'
export   const  POST=async(req:Request) =>{
 
    const { postId, userId } = await req.json();
  
    // Check if the user has already liked the post
    const existingLike = await prisma?.postLike.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });
  
    if (existingLike) {
      // User has already liked the post, handle unliking here
      await prisma?.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });
          const likeCount = await prisma.postLike.count({
      where: {
        postId: postId,
      },
    });
      return NextResponse.json({message:"Post is disliked",counts:likeCount,liked:false})
    } else {
      // User hasn't liked the post, create a new like
      await prisma?.postLike.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
       const likeCount = await prisma.postLike.count({
      where: {
        postId: postId,
      },
    });
      return NextResponse.json({message:"Post is liked",counts:likeCount,liked:true})
    }
  } 



  export const GET=async(req:NextRequest)=>{
    const userId= req.nextUrl.searchParams.get("userId") as string
   
     const likedPosts = await prisma?.user
  .findUnique({ where: { id: userId } })
  .likedPosts();
  return NextResponse.json({likedPosts:likedPosts,message:"got liked posts"})
  }