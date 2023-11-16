import Image from "next/image";
import React from "react";
import loader from '../../public/svg/loader.svg'
const Loader = () => {
  return (
    <>
      <Image
        className=""
        alt="waves"
        src={loader}
      />
    </>
  );
};

export default Loader;
