import { NextRequest, NextResponse } from "next/server";


import prisma from '@/app/libs/prismaDB'
export const GET =async(req:NextRequest)=>{
  const userId=req.nextUrl.searchParams.get("userId") as string
  const users =await prisma?.user.findMany({where:{NOT:{id:userId}}});

  return  NextResponse.json({message:"created successfully",users})
}


export const POST = async (req: Request) => {
  try {
    const { id } = await req.json();
    console.log('Got inside POST:', id);

    const user = await prisma.user.findUnique({where:{id},
      include:{
      Posts:{include:{comments:{include:{user:true}},user:true}},
    followers:{include:{follower: { select: { id: true, name: true, email: true, username: true, image: true } } }},
    following:{include:{user: { select: { id: true, name: true, email: true, username: true, image: true } } }},
    },
  
  })

    if(!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 404 });
    }

    // Modify followers and following arrays to use the user object
    const modifiedFollowers = user.followers.map(((follower:any) => follower.follower));
    const modifiedFollowing = user.following.map(((followingUser:any) => followingUser.user));

    if (user.Posts) {
      for (let i = 0; i < user.Posts.length; i++) {
        const post = user.Posts[i];
        const likeCount = await prisma.postLike.count({
          where: { postId: post.id },
        });
        user.Posts[i] = { ...post, likesCount: likeCount !== undefined ? likeCount : null };
      }
    }

    return NextResponse.json({ message: "Profile fetched successfully", user: { ...user, followers: modifiedFollowers, following: modifiedFollowing } });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ message: "Error fetching user profile" }, { status: 500 });
  }
};
