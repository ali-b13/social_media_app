import Container from "../components/layout/Container";
import LoginModal from "../components/modals/LoginModal";
import Navbar from "../components/Navbar/NavBar";
import Sketch from "../components/Sketch";
import loginSvg from "../../public/svg/login1.svg";
import MobileView from "../components/layout/MobileView";
import {getUser} from "../actions/user";
import { redirect } from "next/navigation";

const Login = async() => {
   const user =await getUser();
    if (user) {
      redirect("/");
    }
  return (
    <>
      <div className="sm:flex  hidden">
        <Container>
          <div className={` flex flex-col w-full  `}>
            <Navbar logo="Go Rock" login="Login" register="Register" />
            <LoginModal />
          </div>
          <Sketch svg={loginSvg} />
        </Container>
      </div>
      <div className="sm:hidden">

       <MobileView >
        <LoginModal/>
       </MobileView>

      </div>
    </>
  );
};



  export default Login;