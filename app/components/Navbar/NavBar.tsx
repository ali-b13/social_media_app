"use client";
import React from "react";
interface Props {
  logo: string;
  login: string;
  register: string;
}
const Navbar: React.FC<Props> = ({ logo, login, register }) => {
  return (
    <div className="flex  flex-row justify-between p-6 align-middle items-center">
      <div className="text-[#6c63ff] text-xl">{logo}</div>
      <ul className="flex  text-sm gap-6 ">
        <li className="text-[#6c63ff]">{login}</li>
        <li>{register}</li>
      </ul>
    </div>
  );
};

export default Navbar;
