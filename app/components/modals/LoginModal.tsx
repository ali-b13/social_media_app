"use client";
import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import Input from '../inputs/Input';
import axios from 'axios'
import {useForm,FieldValues,SubmitHandler,Resolver } from 'react-hook-form'
import RippleButton from '../Buttons/RippleButton';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import {toast} from 'react-hot-toast'
import Loader from '../Loader';


const resolver: Resolver<FieldValues> = (values: FieldValues) => {
  return {
    values: values.username ? values : {},
    errors: {
      ...(values.username === "" || !values.username
        ? {
            username: {
              type: "required",
              message: "Please enter username",
            },
          }
        : {}),
      ...(values.password === "" || !values.password
        ? {
            password: {
              type: "required",
              message: "Please enter password",
            },
          }
        : {}),
    },
  };
};
const LoginModal = () => {

  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false)
  const handleNavigation=()=>{
    router.push('/register')
  }
const {handleSubmit,register,formState:{errors},setError,clearErrors}=useForm<FieldValues>({resolver,defaultValues:{username:"",password:""}});
  const onSubmit:SubmitHandler<FieldValues>=async(data,e:any)=>{
     e.preventDefault()
     setIsLoading(true);
  const res=await signIn('credentials',{...data,redirect:false,type:"login"})
   if(res?.error){
    toast.error("Failed in login");
    setError("invalidCredentails", { type: "validate", message: res.error });
  }else{
   
    toast.success("LoggedIn")
    router.push('/')
  }
  setIsLoading(false);

  }
    const [isDisabled, setDisabled] = useState(false);
    useEffect(() => {
      if (
        errors["username"] ||
        errors["password"] 
      ) {
        setDisabled(true);
        clearErrors("invalidCredentails");
      } else {
        setDisabled(false);
      }
    }, [errors["username"], errors["password"], errors["invalidCredentails"]]);
    let body = (
      <>
        <RippleButton
          className="w-full flex flex-row gap-3 m-4 justify-center items-center bg-gray-400 rounded-lg"
          name=" Sign with Google"
          icon={FcGoogle}
          onClick={() => signIn("google")}
          width="100"
          height="100"
        />
        <div className="w-full flex items-center md:mt-4 md:mb-4">
          <span className="flex-1 h-1 bg-gray-300"></span>
          <span className="m-1 font-serif font-bold text-gray-600">Or</span>
          <span className="flex-1 h-1 bg-gray-300"></span>
        </div>
        <Input
        className=''
          onPressSubmit={handleSubmit(onSubmit)}
          inputName="username"
          borderOutline
          register={register}
          errors={errors}
          title="username"
        />
        <Input
        className=''
          onPressSubmit={handleSubmit(onSubmit)}
          inputName="password"
          borderOutline
          register={register}
          errors={errors}
          type="password"
          title="password"
        />
       {isLoading?<Loader/>:null} 
      </>
    );
  let footer = (
    <>
      <div className="self-end p-1 cursor-pointer text-neutral-600 text-sm font-mono select-none">
        Forget Password?
      </div>
      <p onClick={handleNavigation} className="p-2 text-xs  select-none m-2 cursor-pointer font-mono text-[#6c63ff]">
        Don't have an Account? Register here
      </p>
    </>
  );
  return (
    <div className=" w-full h-full ">
      <Modal
        title="Login"
        description="Login to continue  to our application"
        onSubmit={handleSubmit(onSubmit)}
        body={body}
        footer={footer}
        errors={errors}
        isDisabled={isDisabled}
      />
    </div>
  );
}
 
export default LoginModal;