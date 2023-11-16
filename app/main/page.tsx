import { Router } from "next/router";

import { redirect } from "next/navigation";
import { getUser } from "../actions/user";
import SideBar from "../components/Navbar/SideBar";
import Feed from "../components/feed/Feed";
import RightNav from "../components/Navbar/RightNav";
import MainLayout from "../components/layout/MainLayout";

export default async function MainHome() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <MainLayout>
      <div className=" hidden md:flex">
        <div className={` flex flex-row   w-full h-screen  `}>
         
          <div className=" z-40 w-[80%]   xl:w-[60%] ">
            <Feed user={user} />
          </div>
          <div className=" w-[0px] xl:w-[30%] hidden xl:flex ">
            <RightNav user={user} />
          </div>
        </div>
      </div>
      <div className="flex md:hidden w-full"></div>
    </MainLayout>
  );
}
