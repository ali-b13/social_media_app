"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "@/app/components/Buttons/RippleButton";
interface PropsModal {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel?: string;
  onSubmit: () => void;
  isLoading: boolean;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  noButtons?:boolean
}
const FieldModal: React.FC<PropsModal> = ({
  isOpen,
  onClose,
  onSubmit,
  body,
  title,
  footer,
  actionLabel,
  disabled,
  isLoading,
  secondaryAction,
  secondaryActionLabel,
  noButtons
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  const handleOnClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [showModal, disabled]);
  const handleSubmit = useCallback(() => {
    if (disabled) return null;
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return null;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed
      overflow-x-hidden z-50 
      overflow-y-auto inset-0 flex
      justify-center items-center
      bg-neutral-700/70 outline-none
       focus:outline-none"
      >
        <div
          className="
      relative
       w-full
       md:w-4/6
       lg:w-3/6
       xl:w-2/5
       my-6
       mx-auto
       h-full
       md:h-auto
       xl:h-auto
       "
        >
          {/* Content container */}
          <div
            className={`
        translate
        duration-300
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}
        `}
          >
            <div
              className="
            translate
             h-full
             md:h-auto
             lg:h-auto
             border-0
             rounded-lg
             relative
             flex-col
             w-full
             bg-white
             outline-none
             focus:outline-none
             
             "
            >
              {/* Modal Header  */}
              <div
                className="
              relative 
              flex 
              items-center
               justify-center 
               p-6 rounded-t 
               border-b-[1px]"
              >
                <button className="absolute right-1 p-1  transition outline-none focus:outline-none hover:opacity-70 border-0 ">
                  <IoMdClose onClick={handleOnClose} size={18} />
                </button>
                <div className="font-semi-bold text-lg">{title}</div>
              </div>
              {/* body  */}
              <div className="relative p-6 flex-auto ">{body}</div>
              {/* Footer  */}
              <div className="flex flex-col gap-2 p-6">
                {noButtons ? null : (
                  <div className="flex flex-center flex-row gap-4 ">
                    {secondaryActionLabel && (
                      <Button
                        className="bg-black text-white rounded-md w-full"
                        SubmitType
                        name={secondaryActionLabel}
                        onClick={secondaryAction ? secondaryAction : () => {}}
                      />
                    )}
                    <Button
                      className="bg-[#6c63ff] text-white rounded-md w-full"
                      SubmitType
                      disabled={disabled}
                      name={actionLabel||""}
                      onClick={handleSubmit}
                    />
                  </div>
                )}
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldModal;
