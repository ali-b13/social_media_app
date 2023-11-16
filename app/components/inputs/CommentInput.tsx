"use client"
import React, { useEffect, useState } from 'react'
import { BiComment, BiBookmark } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import Input from './Input'
import TextArea from './TextArea';
import { FieldValues, Resolver, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { CiHeart } from 'react-icons/ci';
import Loader from '../Loader';
import EmojiPicker from './EmojiPicker';
import { FaIcons } from 'react-icons/fa';
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { fetchLikedPosts } from '@/app/redux/features/posts/likedPostSlice';
import { useAppSelector } from '@/app/hooks/useAppSelector';
import useCommentModal from '@/app/hooks/useCommentModal';


const resolver: Resolver<FieldValues> = (values: FieldValues) => {
   return {
     values: values.comment ? values : {},
     errors: {
       ...(values.comment === "" || !values.comment ||values.comment.split(" ")==""
         ? {
             comment: {
               type: "required",
               message: "empty",
             },
           }
         : {}),
        }}}
const CommentInput = ({
  post,
  setUpdatedPost,
  likesCount,
  time,
}: any) => {
  const likedPosts=useAppSelector(state=>state.likedPosts.value);
 const {isLiked_and_counts,setIsLiked_and_counts} =useCommentModal();
  const [postLiked, setPostIsLiked] = useState(likedPosts.some((likedPost) => likedPost.postId === post.id?true:false));
  const dispatch=useAppDispatch()
  const [count, setCount] = useState(likesCount);
  useEffect(()=>{},[count])
  const [isLoading,setIsLoading]=useState(false);
  const [showPicker,setShowPicker]=useState(false)
  const { data: session } = useSession();

  const handlePostLike = async (postId: string) => {
    
    setPostIsLiked((prev: boolean) => !prev);
    try {
      const res = await fetch("/api/feed/post/likes", {
        body: JSON.stringify({ userId: session?.user.id, postId: postId }),
        method: "POST",
        headers: {
          "Content-Type": "application/json", //  content type to JSON
        },
      });
      const data = await res.json();
      setCount(data.counts)
      setPostIsLiked(data.liked)
      setIsLiked_and_counts(data.counts,data.liked)
      dispatch(fetchLikedPosts(session?.user.id as string))
      
    } catch (error) {
      console.log(error, "error in post liked");
    }
  };
  const {
    register,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver,
    defaultValues: {
      comment: "",
    },
  });
  const comment = watch("comment");
  const setCustomizedVlaue=(id:string,val:string)=>{
   setValue(id,val)
  }
  const handleSubmitComment = async () => {
    if (comment == "" || comment.split(" ").join("") == "") return;
    try {
      setIsLoading(true);
      const res = await fetch("/api/feed//post/comment", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          postId: post.id,
          comment,
        }),
      });
      if (res.ok) {
        setValue("comment", "");
        const data = await res.json();
        console.log(data, "data");
        setUpdatedPost((prev: any) => ({
          ...prev,
          comments: [...prev.comments, data.commentPost],
        }));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error, "error in hanlding comment");
    }
  };

  const getDate = () => {
    const isoDate = new Date(time);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract the day and month components
    const day = isoDate.getDate(); // Get the day (1-31)
    const monthIndex = isoDate.getMonth(); // Get the month (0-11)

    // Format the date as "1 August" (for example)
    const formattedDate = `${day} ${monthNames[monthIndex]}`;
    console.log(formattedDate, "and time is", time);
    return formattedDate;
  };
  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
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
          <BiComment size={22} />
        </div>
        <BiBookmark size={22} />
      </div>
      <div className="flex flex-col gap-1 justify-start p-1">
        <div className="font-bold text-neutral-900 font-roboto text-sm">
          {isLiked_and_counts.counts} likes
        </div>
        <div className="text-xs text-neutral-400">{getDate()}</div>
        <div className="flex justify-between gap-2 ">
          <span
            className="cursor-pointer self-center"
            onClick={() => setShowPicker((prev: any) => !prev)}
          >
            <FaIcons />
          </span>
          <div className="">
            <EmojiPicker
              showEmoji={showPicker}
              register={register}
              setCustomizedVlaue={setCustomizedVlaue}
              comment={comment}
            />
          </div>
          <TextArea
            register={register}
            inputName="comment"
            title="Add Comment"
            className="w-full h-full pt-4 text-sm   outline-none border-t-[1px] resize-none   text-neutral-700 font-semibold"
          />
          <span
            onClick={handleSubmitComment}
            className={`${
              comment.split(" ").join("") === ""
                ? " cursor-not-allowed text-blue-300"
                : "text-blue-600  cursor-pointer"
            } font-bold  transition-all duration-75 self-center`}
          >
            {isLoading ? <Loader /> : "Post"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentInput