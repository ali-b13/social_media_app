"use client";
import React, { useEffect, useState } from 'react'
import RippleButton from '../Buttons/RippleButton';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { IconType } from 'react-icons';
interface ModalProps {
  title: string;
  description?: string;
  actionLabel?: string;
  secondaryLabel?: string;
  secondAction?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  isDisabled?: boolean;
  errors: FieldErrors<FieldValues>;
}
const Modal :React.FC<ModalProps>= ({
    title,
    description,
    actionLabel,
    secondAction,
    secondaryLabel,
    isOpen,
    onClose,
    onSubmit,
    body,
    footer,
    isDisabled,
    errors

}) => {
  return (
    <div className="flex flex-col items-center gap-2    sm:gap-4 ">
      <header className="text-4xl text-[#6c63ff] mt-4">{title}</header>
      <p className="text-sm text-neutral-500 font-light font-mono">
        {description}
      </p>
      <div className="flex flex-col   w-full sm:w-4/6 md:w-4/5 xxl:w-3/6  justify-center items-center align-middle">
        {body}

        {errors["invalidCredentails"] ? (
          <p className="text-red-400 text-xs sm:text-sm font-mono p-2 ">
            {errors["invalidCredentails"]?.message?.toString()}
          </p>
        ) : null}
        <RippleButton
          name={title}
          onClick={onSubmit}
          width="70"
          height="70"
          rounded
          className={` flex flex-row justify-center items-center gap-4 w-full ${
            isDisabled ? "bg-[#333334]" : "bg-[#6c63ff]"
          }   my-4 rounded-lg  ${
            isDisabled
              ? "cursor-not-allowed"
              : "cursor-pointer  active:bg-sky-700"
          }`}
          SubmitType
          disabled={isDisabled}
        />
        {footer}
      </div>
    </div>
  );
}

export default Modal