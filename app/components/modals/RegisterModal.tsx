"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { useForm, FieldValues, SubmitHandler, Resolver } from "react-hook-form";
import RippleButton from "../Buttons/RippleButton";
import {signIn} from 'next-auth/react'
import {FcGoogle} from 'react-icons/fc'
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader";
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resolver: Resolver<FieldValues> = (values) => {
  return {
    values: values.username ? values : {},
    errors: {
      ...(values.fullName === "" || !values.fullName
        ? {
            fullName: {
              type: "required",
              message: "Fill Full Name field",
            },
          }
        : {}),
      ...(values.username === "" || !values.username
        ? {
            username: {
              type: "required",
              message: "Fill username field",
            },
          }
        : {}),
      ...(values.email === "" || !values.email
        ? {
            email: {
              type: "required",
              message: "Fill email field",
            },
          }
        : {}),
      ...(!RegExp(emailRegExp).test(values.email)
        ? {
            email: {
              type: "required",
              message: "Email is invalid ",
            },
          }
        : {}),
      ...(values.password === "" || !values.password
        ? {
            password: {
              type: "required",
              message: "Fill password field",
            },
          }
        : {}),
      ...(values.confirmPassword === "" || !values.confirmPassword
        ? {
            confirmPassword: {
              type: "required",
              message: "Fill password field ",
            },
          }
        : {}),
      ...(values.password.toString() !== values.confirmPassword.toString()
        ? {
            confirmPassword: {
              type: "required",
              message: "Passwords do not match ",
            },
          }
        : {}),
    },
  };
};
const RegisterModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleNavigation = () => {
      router.push("/login");
    };
    const {
      handleSubmit,
      register,
      watch,
      setError,
      clearErrors,
      formState: { errors },
    } = useForm<FieldValues>({
      resolver,
      defaultValues: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        setIsLoading(true)
        const res=await signIn("credentials",{...data,redirect:false,type:"register"})

          if (res?.error) {
            toast.error("Failed in register");
             setError("invalidCredentails", {
               type: "validate",
               message: res.error,
             });
          }else {
            
            toast.success("Register successfully");
            router.push("/");
    }
    setIsLoading(false)
  }

    const [isDisabled, setDisabled] = useState(false);
    
     useEffect(() => {
       if (
         errors["username"] ||
         errors["fullName"] ||
         errors["password"] ||
         errors["email"] ||
         errors["confirmPassword"]
       ) {
         setDisabled(true);
       } else {
         setDisabled(false);
         clearErrors("invalidCredentails");
       }
     }, [
       errors["username"],
       errors["fullName"],
       errors["password"],
       errors["email"],
       errors["confirmPassword"],
     ]);
    
  let body = (
    <>
      <Input
        onPressSubmit={handleSubmit(onSubmit)}
        borderOutline
        register={register}
        errors={errors}
        title="Full Name"
        inputName="fullName"
      />
      <Input
        onPressSubmit={handleSubmit(onSubmit)}
        borderOutline
        register={register}
        errors={errors}
        title="Username"
        inputName="username"
      />
      <Input
        onPressSubmit={handleSubmit(onSubmit)}
        borderOutline
        register={register}
        errors={errors}
        type="email"
        title="Email"
        inputName="email"
      />
      <Input
        onPressSubmit={handleSubmit(onSubmit)}
        borderOutline
        register={register}
        errors={errors}
        type="password"
        title="Password"
        inputName="password"
      />
      <Input
        onPressSubmit={handleSubmit(onSubmit)}
        borderOutline
        register={register}
        errors={errors}
        type="password"
        title="Confirm Password"
        inputName="confirmPassword"
      />
      <div className="w-full flex items-center md:mt-3 md:mb-3">
        <span className="flex-1 h-1 bg-gray-300"></span>
        <span className="m-1 font-serif font-bold text-gray-600">Or</span>
        <span className="flex-1 h-1 bg-gray-300"></span>
      </div>
      <RippleButton
        className="bg-gray-400 mt-1 w-full flex  justify-center gap-3 items-center rounded-lg"
        name=" Sign with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      {isLoading ? <Loader /> : null}
    </>
  );
  let footer = (
    <>
      
      <div onClick={handleNavigation} className="p-0 z-50 sm:p-2 text-xs  select-none m-2 cursor-pointer font-mono text-[#6c63ff]">
        Already have an Account? Sign In here
      </div>
    </>
  );
  return (
    <div className=" w-full h-full ">
      <Modal
      errors={errors}
        title="Register"
        description="Fill the below fields to register"
        onSubmit={handleSubmit(onSubmit)}
        body={body}
        footer={footer}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default RegisterModal;
