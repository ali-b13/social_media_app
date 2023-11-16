"use client";
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import React from 'react'
interface InputProps {
  title?: string;
  borderOutline?: boolean;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  inputName: string;
  className?:string,
  onPressSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({
  type,
  borderOutline,
  title,
  register,
  errors,
  inputName,
  className,
  onPressSubmit
}) => {
  console.log(errors["invalidCredentails"]?.message, "errors");
  return (
    <>
      <input
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if(onPressSubmit){
              onPressSubmit(event);

            }
          }
        }}
        {...register(inputName)}
        type={type ? type : "text"}
        className={`${className} ${
          borderOutline
            ? "border-neutral-400 rounded-lg border-2 outline-[#6c63ff]"
            : " border-b-2 border-neutral-400 outline-none"
        } m-2 p-2   w-[99%]  ${
          errors[inputName.toString()] ? "outline-red-500" : "outline-[#6c63ff]"
        }  placeholder:text-sm font-mono text-[#6c63ff] `}
        placeholder={title}
      />
      {errors[inputName] ? (
        <p className="text-red-400 text-[12px] sm:text-sm  font-mono ">
          {errors[inputName]?.message?.toString()}
        </p>
      ) : null}
    </>
  );
};

export default Input