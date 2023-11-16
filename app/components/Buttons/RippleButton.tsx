"use client";
import React, { useEffect, useState } from "react";
import {IconType} from 'react-icons'
import  "./button.css";
interface Props {
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  height?: string;
  width?: string;
  rounded?: boolean;
  className: string;
  SubmitType?: boolean;
  disabled?: boolean;
  icon?: IconType|null;
}
const RippleButton: React.FC<Props> = ({SubmitType,className, name,rounded, onClick,width,height,disabled,icon:Icon }) => {


 useEffect(()=>{
  const rippleBtn=document.querySelector('.ripple_button');
      rippleBtn?.addEventListener('click',({pageX,pageY,currentTarget}:any)=>{
         const x = ((pageX - currentTarget.offsetLeft) * 100) /currentTarget.offsetWidth;
         const y = ((pageY - (currentTarget.offsetTop)) * 100) / currentTarget.offsetHeight;
        const ripple=document.createElement('span');
         const rippleColor="#212129";
         ripple.classList.add('ripple_effect');
         ripple.style.backgroundColor=rippleColor;
         rippleBtn.appendChild(ripple);
         ripple.style.left=x+"%";
         ripple.style.right = y+"%";
         
          setTimeout(() => {
            ripple.remove()
          }, 200);
      })

 },[])

  return (
    <button
      onClick={onClick}
      type={SubmitType ? "submit" : "button"}
      disabled={disabled}
      data-ripple={"ripple"}
      className={`${className} ripple_button ${disabled?"cursor-not-allowed bg-blue-950":" cursor-pointer "} `}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onclick
          }
      }
    }
    >
      <div>{name}</div>
      {Icon ? <Icon size={28} /> : null}
    </button>
  );
};

export default RippleButton;
