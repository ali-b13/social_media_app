import React from 'react'
import Container from '../components/layout/Container'
import Navbar from '../components/Navbar/NavBar'
import MobileView from '../components/layout/MobileView'
import RegisterModal from '../components/modals/RegisterModal'
import signUpSvg from "../../public/svg/signup1.svg";
import Sketch from '../components/Sketch'
import {getUser} from '../actions/user';
import { redirect } from 'next/navigation';
const Register =async () => {
    const user = await getUser();
    if (user) {
      redirect("/");
    }
  return (
    <>
      <div className="sm:flex  hidden ">
        <Container>
          <div className={`  flex flex-col w-full  `}>
            <RegisterModal />
          </div>
          <Sketch svg={signUpSvg} />
        </Container>
      </div>
      <div className="sm:hidden ">
        <MobileView>
          <RegisterModal />
        </MobileView>
      </div>
    </>
  );
}

export default Register