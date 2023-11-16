"use client";
import React, { useCallback } from 'react'
import {CldUploadWidget} from 'next-cloudinary'
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import {  FieldValues, UseFormRegister} from 'react-hook-form';
declare global{
  var coludinary:any
}
interface ImageProps {
  value: string;
  onChange: (value: string) => void;
  setIsImageFormat: React.Dispatch<React.SetStateAction<boolean>>;
  isImageFormat: boolean;
}
const ImageUpload :React.FC<ImageProps>= ({value,onChange,isImageFormat,setIsImageFormat}) => {
  const handleUpload=useCallback((res:any)=>{
    onChange(res.info.secure_url);
    if(res.info.format=="mp4"){
      setIsImageFormat(false)
    }else {
      setIsImageFormat(true);
    }
    console.log(res,'res')
  },[onChange])
  console.log(value,'url')
  return (
    <CldUploadWidget
      uploadPreset="kfatw7xi"
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
      >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative 
        cursor-pointer
         border-dashed
           hover:opacity-70 
           border-2
           p-20
           border-neutral-400
           flex 
           flex-col
           justify-center
           items-center
           transition
           gap-4
           "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semi-bold text-slate-900 text-lg">
              Choose from Gallery
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                {isImageFormat ? (
                  <Image
                    style={{ objectFit: "cover" }}
                    fill
                    alt={"image"}
                    src={value}
                  />
                ) : (
                  <video  src={value} itemType='mp4' className="w-[100%] h-64 self-center" controls>
                   Does not work
                  </video>
                )}
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload