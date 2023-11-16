export const getPosts=async(userId:string,page:number,pageSize:number)=>{
  console.log("id is ",userId)
  const res=await fetch(`/api/feed/post?userId=${userId}&page=${page}&pageSize=${pageSize}`,{method:"GET",})
  const data=await res.json();
  return data
}
export const getLikedPosts=async(userId:string)=>{
 const res=await fetch(`/api/feed/post/likes?userId=${userId}`,{method:"GET",})
  const data=await res.json();
  return data
}