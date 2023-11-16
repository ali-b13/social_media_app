"use client"
import React from 'react'
import SideBar from '../Navbar/SideBar'
import CommentModal from '../modals/FieldModal/CommentModal'
import PostModal from '../modals/PostModal'

const MainLayout = ({children ,user}:any) => {
  return (
    <div className="flex w-full ">
      <PostModal />
      <div className="mr-52">
        <div className=" w-auto  h-full  fixed top-0 ">
          <SideBar />
        </div>
      </div>

      <div className="w-full"> {children}</div>
    </div>
  );
}

export default MainLayout