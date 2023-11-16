"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {  BiComment, BiBookmark, BiDotsHorizontalRounded } from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {BsBookmarkCheckFill} from 'react-icons/bs'
import Image from 'next/image'
import { CiHeart } from 'react-icons/ci'
import User from '../User';
import { signOut, useSession } from 'next-auth/react'
import useCommentModal from '@/app/hooks/useCommentModal'
import axios from 'axios'

const Post = ({ post, isLiked }: any) => {
   const [seen, setSeen] = useState(false);
  const postRef = useRef(null);
  const {data:session}=useSession();

  useEffect(() => {
    
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.5, // When at least 50% of the post is visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
       
        if (entry.isIntersecting && !seen) {
          // Post is visible and not marked as seen yet
          markPostAsSeen();
        }
      });
    }, options);
    

    // Start observing the post element
    if (postRef.current) {
      observer.observe(postRef.current);
      
    }

    return () => {
      // Clean up the observer when the component unmounts
      observer.disconnect();
    };
  }, [postRef.current]);

  const markPostAsSeen = () => {
    const postId = post.id; 
    const userId = session?.user.id

    // Send a request to mark the post as seen
    axios.post(`/api/feed/post/post-seen`, { postId, userId })
      .then((response) => {
        // Update the UI to indicate that the post has been seen
        setSeen(true);
      })
      .catch((error) => {
        // Handle error
        console.log(error,'error while post is seen')
      });
  };
  const [postLiked, setPostIsLiked] = useState(isLiked);
  const [count,setCount]=useState(post.likesCount)
  // crearte state for count and state for like
  const [isSaved, setIsSaved] = useState(false);
 
 
  const handlePostLike=async(postId:string)=>{
    if(postLiked){
      setCount((prev:number)=>prev-1)
    }else{
      setCount((prev:number)=>prev+1)
    }
      setPostIsLiked((prev:boolean)=>!prev);
      try {

          const res = await fetch("/api/feed/post/likes", {
            body: JSON.stringify({ userId: session?.user.id, postId: postId }),
            method: "POST",
            headers: {
              "Content-Type": "application/json", //  content type to JSON
            },

          });
          const data=await res.json();
          setIsLiked_and_counts(data.counts,data.liked)
          console.log(data,'from like')
      } catch (error) {
         console.log(error,'error in post liked')
      }
  }
  const { setPost, onOpen ,setIsLiked_and_counts} = useCommentModal();
  function isVideoUrl(url: string) {
    return url.includes("video/upload");
  }
  const MediaPost = useCallback(() => {
    if (isVideoUrl(post.image)) {
      return <video className="w-full" controls src={post.image}></video>;
    } else {
      return (
        <Image
        className='max-h-[60vh] '
          src={post.image}
          alt="post"
          width={600}
          height={600}
          
        />
      );
    }
  }, [post]);
  const handleOpenCommentModal = (post: any) => {
    onOpen();
    setPost(post);
  };
  return (
    <div ref={postRef} className="w-[90%]  p-6  shadow-md m-2 ">
      {/* Top part */}
      <div className="flex justify-between">
        <User user={post.user} />
        <BiDotsHorizontalRounded size={30} />
      </div>

      {/* content */}
      <div className="max-h-max ">
        <MediaPost />
      </div>

      {/* footer */}
      <div className="flex flex-col py-2 ">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center  justify-start">
            {/* <BiHeart fill="red" size={30} />0 */}
            {postLiked ? (
              <FcLike
                className={"cursor-pointer"}
                onClick={() => handlePostLike(post.id)}
                fill="red"
                size={25}
              />
            ) : (
              <CiHeart
                size={25}
                onClick={() => handlePostLike(post.id)}
                className="cursor-pointer"
              />
            )}

            <BiComment
              onClick={() => handleOpenCommentModal(post)}
              className="cursor-pointer"
              size={24}
            />
          </div>
          {isSaved ? (
            <BsBookmarkCheckFill
              fill="#000"
              color="#000"
              onClick={() => setIsSaved((prev) => !prev)}
              size={22}
            />
          ) : (
            <BiBookmark
              className="cursor-pointer"
              onClick={() => setIsSaved((prev) => !prev)}
              size={25}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col  gap-2 ">
        <div className="text-[#040405e2] font-semibold font-roboto text-sm">
          {post?.content}
        </div>
        <div className="flex flex-col">
          <div className="text-[#040405e2] font-semibold font-roboto text-sm">
            {count ? count : 0} likes
          </div>
          <div className="text-neutral-400 text-sm" onClick={() => signOut()}>
            {post.comments.length > 0
              ? ` view All ${post.comments.length} comments`
              : "Be the first to comment"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post