import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST =async(req:Request)=>{
  const {imgSrc,comment,userId}=await req.json();
  const post =await prisma?.post.create({data:{image:imgSrc,userId:userId,content:comment},include:{user:{select:{id:true,username:true,image:true,name:true}},comments:true}})
  return  NextResponse.json({message:"created successfully",post})
}


export const GET =async(req:NextRequest)=>{
 
    const userId=req.nextUrl.searchParams.get("userId") as string
    const page=Number(req.nextUrl.searchParams.get("page") )
    const pageSize=Number(req.nextUrl.searchParams.get("pageSize") )
     const offset = (page - 1) * pageSize;
    console.log(userId,page,pageSize,offset,'all there')
    const user=await prisma?.user.findUnique({where:{id:userId}})
    console.log(user,'user')
    if(user){
        const followers=await prisma?.follower.findMany({where:{userId:user.id},include:{follower:true,}});
        let followersIds=followers?.map(follower=>follower.followerId)
        console.log(followersIds,'ids')
        const followersPosts =await prisma?.post.findMany({where:{userId:{in:followersIds}},skip:offset,take:pageSize,include:{user:true,comments:{include:{user:true}}},orderBy:{createdAt:"desc"}})
       if(followersPosts){
        for (let i = 0; i < followersPosts.length; i++) {
        const post = followersPosts[i];
        const likeCount = await prisma?.postLike.count({
          where: { postId: post.id },
        });
        followersPosts[i] = { ...post, likesCount:likeCount !== undefined ? likeCount : null  }; // Add likeCount to the post
      }
      console.log(followersPosts,'posts')
      return NextResponse.json({message:"got it",posts:followersPosts,offset,page,pageSize})
    }
       }
      
}
