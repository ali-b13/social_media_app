import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismaDB'
interface ICredentails{
    username:string,
    password:string
}
const login=async(credentials:any)=>{
         const username=credentials?.username
          const password=credentials?.password
        const user =await prisma.user.findUnique({where:{username:username}})
        if(user){
          const userPassword=user.password||""
          const isTrueUser= await bcrypt.compare(password,userPassword)
          if(isTrueUser){
            return Promise.resolve({...user,password:null})
          }
        };
         
        throw new Error("Invalid credentails")
}
export default login