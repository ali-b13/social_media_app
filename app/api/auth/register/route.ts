import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
interface IRegisterDetails{
    username:string,
    password:string,
    email:string,
    confirmPassword:string

}
 const register=async(credentails:any)=>{
 const {username,password,email,confirmPassword,fullName}= credentails;
   if(password!==confirmPassword)throw new Error("Password do not match")
   const existedUsername=await prisma?.user.findUnique({where:{username}});
   if(existedUsername){
       throw  new Error("user is taken ,try another")   
   } 
    const existedEmail=await prisma?.user.findUnique({where:{email:email}});
    console.log(existedEmail,'email')
    if(existedEmail)throw new Error("You already have an account with this Email")

   const hashedPassword=await bcrypt.hash(password,Number(process.env.bcrypt_salt))
  const user=   await prisma?.user.create({data:{username,password:hashedPassword,email,name:fullName}})
      
      if(user){return user}
      return null
}
export default register