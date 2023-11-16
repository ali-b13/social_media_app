"use client"
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { useAppSelector } from '@/app/hooks/useAppSelector';
import useCommentModal from '@/app/hooks/useCommentModal';
import { fetchLikedPosts } from '@/app/redux/features/posts/likedPostSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useCallback, useEffect } from 'react'
import { BiComment, BiLike } from 'react-icons/bi';

const Item = ({post}:any) => {
  const {setPost,onClose,onOpen,setIsLiked_and_counts}=useCommentModal();
  const likedPosts=useAppSelector(state=>state.likedPosts.value)
 
  const handleOpenModal=()=>{
    setIsLiked_and_counts(post.likesCount,likedPosts.some(likedPost=>likedPost.id==post.id)?true:false)
    setPost(post);
    
    onOpen()
  }
  function isVideoUrl(url: string) {
    return url.includes("video/upload");
  }
  const MediaPost = useCallback(() => {
    if (isVideoUrl(post.image)) {
      return <video className="w-full h-[20rem]" controls src={post.image}></video>;
    } else {
      return (
        <Image
        className='h-[20rem] object-cover'
          src={post.image}
          alt="post"
          width={600}
          height={600}
          
        />
      );
    }
  }, [post]);
  return (
    <div
      onClick={handleOpenModal}
      className="relative group  w-[80%] lg:w-[32%] bg-black"
    >
      <MediaPost/>
      <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center transition-opacity duration-300">
        <div className=" bg-opacity-50 bg-black/70 p-2 rounded-md">
          <div className="flex items-center justify-center text-white space-x-2">
            <BiComment />
            <span>{post.comments ? post.comments.length : 0}</span>
            <BiLike fill="white" color="white" />
            <span>{post.likesCount ? post.likesCount : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item