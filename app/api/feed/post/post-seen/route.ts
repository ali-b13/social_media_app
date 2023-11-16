import { NextResponse } from "next/server";

export const POST=async(req:Request)=>{
  const { postId, userId } = await req.json();

  try {
    // Create a new record in the PostView table
    const seen=await prisma?.postView.findFirst({where:{postId,userId}});
    if(seen){
        return NextResponse.json({ message: 'Post already seen' ,status:200});
    }
    await prisma?.postView.create({
      data: {
        postId: postId,
        userId: userId,
         },
    });
console.log('post is seen with id of',postId)
    NextResponse.json({ message: 'Post marked as seen' ,status:200});
  } catch (error) {
    console.error('Error marking post as seen:', error);
     NextResponse.json({ message: 'failed to make the post seen' ,status:401});
  }
};


