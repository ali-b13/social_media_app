import axios from "axios";

export const getProfileInfo =async(id:string)=>{
    console.log(id,'is received')
  const res = await fetch('http://localhost:3000/api/user',{body:JSON.stringify({id}),method:"POST",cache:"no-cache"});
   const data =await res.json();
   console.log(data,'data received')
   return data.user
};
