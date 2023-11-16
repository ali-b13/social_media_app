import React from "react";
interface FollowProps {
  onClick: () => void;
  title: string;
  outline?: boolean;
}
const EditButton: React.FC<FollowProps> = ({ onClick, title, outline }) => {
  return (
    <button
      className={`${
        outline ? "bg-neutral-200 text-black  " : "bg-blue-400 text-white"
      } text-sm rounded-lg w-[40%] text-center  p-1 self-start`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default EditButton;
