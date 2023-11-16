"use client"
import React, { useEffect, useRef, useState } from 'react'
import  Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import {FaIcons} from 'react-icons/fa'
import { FieldValues, UseFormRegister } from 'react-hook-form'
interface Emoji{
    native:string
}
interface EmojiPickerProps {
  setCustomizedVlaue: (id: string, val: string) => void;
  register: UseFormRegister<FieldValues>;
  comment: string;
  showEmoji?: boolean;
}
const EmojiPicker: React.FC<EmojiPickerProps> = ({
  setCustomizedVlaue,
  register,
  comment,
  showEmoji,
}) => {
  console.log(comment, "comment");
  const handleEmoji = (emoji: any) => {
    console.log(emoji.native, "em");
    const newComment = comment + emoji.native;
    setCustomizedVlaue("comment", newComment);
  };

  const [showPicker, setShowPicker] = useState(showEmoji);
  useEffect(()=>{
    setShowPicker(showEmoji)
  },[showEmoji])
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="absolute top-[-5%] z-40" ref={pickerRef}>
      {showPicker && (
        <Picker
          {...register("emoji")}
          data={data}
          onEmojiSelect={handleEmoji}
        />
      )}
      {/* <button className={""} onClick={() => setShowPicker(!showPicker)}>
        <FaIcons />
      </button> */}
    </div>
  );
};


export default EmojiPicker