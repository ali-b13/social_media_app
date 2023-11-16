"use client"
import React, { useEffect, useMemo, useState } from 'react'
import FieldModal from "./FieldModal";
import ImageUpload from '../../inputs/ImageUpload';
import { FieldValues, useForm,Resolver } from 'react-hook-form';
import Heading from '../../Heading';
 import useCreatePost from '@/app/hooks/useCreatePostModal'
import Input from '../../inputs/Input';
import TextArea from '../../inputs/TextArea';
import EmojiPicker from '../../inputs/EmojiPicker';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { updatePosts } from '@/app/redux/features/posts/postSlice';
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { LoaderIcon } from 'react-hot-toast';
import { FaIcons } from 'react-icons/fa';

 enum Steps{
  IMAGE=0,
  COMMENT=1
 }
 const resolver: Resolver<FieldValues> = (values: FieldValues) => {
   return {
     values: values.comment ? values : {},
     errors: {
       ...(values.imgSrc === "" || !values.imgSrc
         ? {
             imgSrc: {
               type: "required",
               message: "Please choose photo",
             },
           }
         : {}),
       ...(values.comment === "" || !values.comment
         ? {
             comment: {
               type: "required",
               message: "Comment is empty",
             },
           }
         : {}),
     },
   };
 };
const CreatePostModal = () => {
  const dispatch=useAppDispatch()
  const {data:session}=useSession()
  const [isImageFormat,setIsImageFormat]=useState(true)
  const {isOpen,onClose}=useCreatePost()
  const [isLoading,setIsLoading]=useState(false)
  const {
    register,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({resolver,
    defaultValues: {
      imgSrc: "",
      comment: "",
    },
  });
  
  const imgSrc=watch('imgSrc')
  const comment = watch("comment");
   const [showPicker, setShowPicker] = useState(false);
  const handleSubmit=async()=>{
    setIsLoading(true)
     const res=await axios.post("/api/feed/post",{imgSrc,comment,userId:session?.user?.id})
    if(res.status==200){
     dispatch(updatePosts(res.data.post))
     setIsLoading(false)
     setValue('comment',"")
     setValue("imgSrc", "");
     setStep(0)
      onClose()
    }
  }
  const [step, setStep] = useState(Steps.IMAGE);
  const [isDisabled, setDisabled] = useState(false);
   useEffect(() => {
     if (comment=="" &&  imgSrc=="" || !imgSrc) {
       setDisabled(true);
      } else {
        setDisabled(false);
      }
     
   }, [comment, imgSrc]);
   const onNext=()=>{

     setStep(val=>val+1)
   }
   const onBack=()=>{
     setStep((val) => val - 1);
   }
   let actionLabel = useMemo(() => {
     if (Steps.COMMENT==step) return "Create";
     return "Next";
   }, [step]);
   let secondaryActionLabel = useMemo(() => {
     if (Steps.IMAGE==step) return undefined;
     return "Back";
   }, [step]);

    const setCustomizedVlaue=(id:string,val:string)=>{
   setValue(id,val)
    }
    

    let body = (
      <>
        <ImageUpload
          value={imgSrc}
          onChange={(val) => setCustomizedVlaue("imgSrc", val)}
          setIsImageFormat={setIsImageFormat}
          isImageFormat={isImageFormat}
        />

      </>
    );
    if(Steps.COMMENT==step){
      body = (
        <div className={"relative"}>
          <TextArea
            register={register}
            className={
              " w-full text-neutral-500 border-none outline-none resize-none scrollbar-hide min-h-[10rem]"
            }
            borderOutline
            title="Add Comment"
            inputName="comment"
          />
         
          
            <FaIcons
              className="cursor-pointer"
              onClick={() => setShowPicker((prev: any) => !prev)}
            />
          
          <div className="w-full absolute top-[10%]">
            <EmojiPicker
              showEmoji={showPicker}
              comment={comment}
              register={register}
              setCustomizedVlaue={setCustomizedVlaue}
            />
          </div>
        </div>
      );

    }
    const footer = (
      <div className="self-center ">
        {isLoading ? (
          <LoaderIcon style={{ width: "4rem", height: "4rem" }} />
        ) : null}
      </div>
    );
  return (
    <>
      <FieldModal
        actionLabel={actionLabel}
        onSubmit={step==Steps.COMMENT?handleSubmit:onNext}
        secondaryAction={step==Steps.IMAGE?undefined:onBack}
        secondaryActionLabel={secondaryActionLabel}
        title="Share Some Great Images with Followers"
        body={body}
        disabled={isDisabled}
        onClose={onClose}
        isOpen={isOpen}
        footer={footer}
        isLoading={isLoading}
      />
    </>
  );
}

export default CreatePostModal