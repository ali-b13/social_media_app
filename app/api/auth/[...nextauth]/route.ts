import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import prisma from '@/app/libs/prismaDB'

import login from "../login/login";
import register from "../register/route";

export const handler:NextAuthOptions =NextAuth( {
	adapter: PrismaAdapter(prisma),
	providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name:'credentials',
      credentials:{
        fullName: { label: "fullName", type: "text" },
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
        confirmPassword: { label: "confirmPassword", type: "password" },
        email: { label: "email", type: "text" }
      },
     async authorize(credentials,req){

        if(req.body?.type=='login'){
          if(credentials?.username ||credentials?.password){
           return login(credentials)
          }
        }
        else if(req.body?.type=='register'){
          console.log("it is register");
          if(credentials?.username||credentials?.email){
            
           return register(credentials)
          }
        }
       return null
      }
    })
  ] ,
  callbacks:{
  async  session({ session, token, }) {
     
       const user=await prisma.user.findUnique({where:{name:session.user.name||'',email:session.user.email||''}})
       if(user){
         session.user.id=user.id
         
       }
      return session // The return type will match the one returned in `useSession()`
    },
    async signIn({user,profile}){
     const prismaUser=await prisma.user.findUnique({where:{email:user.email?.toString()}})
     if (prismaUser && !prismaUser.username) {
        // Update the username if it's empty
        const username = prismaUser?.name?.replaceAll(' ', '_').toLowerCase()
        await prisma.user.update({
          where: { id: prismaUser.id },
          data: { username: username },
        });
      }
   
     return true
    },
   async redirect({ url, baseUrl }) {
      return baseUrl
    },
   
  },
  pages:{
    signIn:'/'
  },
   debug:process.env.NODE_ENV=="development",
  session:{
    strategy:"jwt",
    
  },
  secret:process.env.NEXTAUTH_SECRET
 
  
});

export {handler as POST,handler as GET}