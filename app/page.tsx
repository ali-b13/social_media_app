import { Router } from "next/router";
import {getUser, getUserFollowers} from "./actions/user";
import Feed from "./components/feed/Feed";
import { redirect } from "next/navigation";
import Logout from "./components/test/Logout";
import SideBar from "./components/Navbar/SideBar";
import RightNav from "./components/Navbar/RightNav";
import Container from "./components/layout/Container";
import MobileNav from "./components/Navbar/MobileNav";
import MobileLayout from "./components/layout/MobileLayout";
import StroyList from "./components/story/StroyList";
import Profile from "./components/modals/PostModal";
export default async function Home() {
  const user = await getUser();
  

  if (!user) {
    redirect("/login");
  }else {redirect('/main')}
  
  
}
