"use client";

import register from "@/app/api/auth/register/route";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
interface InputProps {
  title?: string;
  borderOutline?: boolean;
  type?: string;
  inputName: string;
  className: string;
  register:UseFormRegister<FieldValues>
  onPressSubmit?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<InputProps> = ({
  type,
  borderOutline,
  title,
  inputName,
  className,
  register,
  onPressSubmit,
}) => {
 
  return (
    <>
      <textarea
        {...register(inputName)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (onPressSubmit) {
              onPressSubmit(event);
            }
          }
        }}
        className={`${className}  placeholder:text-sm font-mono  `}
        placeholder={title}
      />
      
    </>
  );
};

export default TextArea;
