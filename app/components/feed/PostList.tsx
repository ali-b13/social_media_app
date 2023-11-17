"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Post from './Post'
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { fetchPosts } from '@/app/redux/features/posts/postSlice';
import { fetchLikedPosts } from "@/app/redux/features/posts/likedPostSlice";
import { useAppSelector } from '@/app/hooks/useAppSelector';
import {Skeleton} from '@mui/material'
import { User } from '@prisma/client';
import axios from 'axios';
import { getPosts } from '@/app/actions/getPosts';
interface USERI {
  user: User;
  displayProfile?:boolean
}
const PostList:React.FC<USERI> = ({user,displayProfile}) => {
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState(1);
  const pageSize:number = 2; // Number of posts per page
  const dispatch=useAppDispatch()
  const [isLoading,setIsLoading]=useState(false);
  const [hasMore,setHasMore]=useState(true)
    const observer = useRef<IntersectionObserver | null>();

  const likedPosts = useAppSelector((state) => state.likedPosts.value);
 const lastElementRef=useCallback((node:any)=>{
  if(!hasMore)return
  if(isLoading)return;
  if(observer.current) observer.current.disconnect()
  observer.current=new IntersectionObserver((entries:any)=>{
    if (entries[0].isIntersecting) {
    setPage((prevPage) => prevPage + 1);
    fetchMorePosts();
    }
  })
  if(node){
    observer.current.observe(node)
  }
  console.log(node,'node')
 },[isLoading,hasMore])
 const fetchMorePosts = async () => {
  console.log("is fetching now")
   if (!isLoading) {
     setIsLoading(true);

     // Fetch more posts from your API or data source
   if(user.id){
      try {
        const data = await getPosts(user.id, page, pageSize);
        setHasMore(data.posts.length > 0);
        if (data.posts.length > 0) {
          setPosts((prev: any) => [...prev, ...data.posts]);

          console.log(posts, "posts  and the data", data);
        }
      } catch (error) {
        console.error("Error fetching more posts:", error);
      }
   }

     setIsLoading(false);
   }
 };

 




useEffect(()=>{
  console.log(posts,'posts')
},[posts])

 useEffect(()=>{

   fetchMorePosts()
   dispatch(fetchLikedPosts(user.id));
   setIsLoading(true)

 },[])
 
  return (
    <div className={`text-black w-full flex flex-col items-center`}>
      {
        posts.length>0 ?
        posts.map((post:any,index:number)=>{
          return (
            <div ref={index+1 === posts.length ? lastElementRef : null}>
              <Post
                key={post.id}
                post={post}
                isLiked={
                  likedPosts.some((likedPost) => likedPost.postId === post.id)
                    ? true
                    : false
                }
              />
            </div>
          );
     }):
      <Skeleton width={'80%'} height={"90vh"}/>
      }
     
    </div>
  );
}

export default PostList
