"use client"
import React, { useCallback, useEffect, useState } from 'react'
import User from '../User'
import PostList from '../feed/PostList'
import Image from 'next/image'
import { BiComment, BiDotsHorizontal, BiLike } from 'react-icons/bi'
import { FcLike } from 'react-icons/fc'
import Item from '../profileContent/Item'
import CommentModal from './FieldModal/CommentModal'
import useCommentModal from '@/app/hooks/useCommentModal'
import Comment from '../Comment'
import CommentInput from '../inputs/CommentInput'
import { useAppSelector } from '@/app/hooks/useAppSelector'
import { useSession } from 'next-auth/react'
import EmojiPicker from '../inputs/EmojiPicker'
import { useAppDispatch } from '@/app/hooks/useAppDispatch'
import { fetchLikedPosts } from '@/app/redux/features/posts/likedPostSlice'
const PostModal = () => {
  const {isOpen,onClose,onOpen,post}=useCommentModal();
  const {data:session}=useSession()
 const dispatch= useAppDispatch()
 useEffect(()=>{
  console.log("fetched ")
  dispatch(fetchLikedPosts(session?.user.id as string));
 },[session])
  
  const [updatedPost,setUpdatedPost]=useState(post);
  useEffect(()=>{
    setUpdatedPost(post)
    console.log(updatedPost,'up')
  },[post])
  function isVideoUrl(url: string) {
    return url.includes("video/upload");
  }
  const MediaPost = useCallback(() => {
    if (isVideoUrl(post.image)) {
      return <video className="w-full h-[100%]" controls src={post.image}></video>;
    } else {
      return (
        <Image
          src={post.image}
          alt="post"
          width={600}
          height={600}
          className='h-full h-max-[60%]'
        />
      );
    }
  }, [post]);
  const body = (
    <div className="flex  justify-around  h-[68vh]">
      <div className="w-2/4 relative">
        <MediaPost />
      </div>
      <div className="w-2/4 flex-col  ">
        <div className="w-full flex justify-between border-b-[1px]">
          <div>
            {" "}
            <User user={post.user} />
          </div>
          <BiDotsHorizontal color="gray" size={22} />
        </div>
        {/* section comments  starts */}
        <div className="max-h-[20rem] min-h-[20rem] flex flex-col gap-3 overflow-y-auto">
          {updatedPost.comments?.length > 0 ? (
            updatedPost.comments.map((comment: any) => {
              return <Comment user={comment.user} comment={comment} />;
            })
          ) : (
            <div className="text-lg text-neutral-800 font-bold p-2 self-center">
              No Comments yet
            </div>
          )}
        </div>
        <div>
          <CommentInput
            setUpdatedPost={setUpdatedPost}
            time={post.createdAt}
            post={post}
            likesCount={post.likesCount}
           
          />
        </div>
        {/* section comments  ends */}
      </div>
    </div>
  );
  return (
     <CommentModal body={body}  handleOnClose={onClose} isOpen={isOpen} handleSubmit={()=>{}} />
  );
}

export default PostModal;

  