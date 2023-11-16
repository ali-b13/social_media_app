import React from 'react'
import User from '../User';
import { BiDotsHorizontal } from 'react-icons/bi';
import FollowButton from '../Buttons/FollowButton';
import EditButton from '../Buttons/EditButton';
import FollowersModal from '../modals/FieldModal/FollowersModal';
import useFollowingModal from '@/app/hooks/useFollowingModal';
import useFollowersModal from '@/app/hooks/useFollowersModal';
import FollowingModal from '../modals/FieldModal/FollowingModal';

const Header = ({user,currentUser}:any) => {
    const isFollowed=user.following.find((follower:any)=>follower.followerId==user.id);
     const { FollowersOnOpen }= useFollowersModal();
     const {FollowingOnOpen}=useFollowingModal()
  return (
    <div className="flex w-[90%] m-4 align-middle items-center justify-around">
      <div className="self-start">
        <User user={user} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-around items-center gap-2">
          {user.id == currentUser.id ? (
            <EditButton title="Edit Profile" outline onClick={() => {}} />
          ) : isFollowed ? (
            <FollowButton isUnfollow title="Unfollow" onClick={() => {}} />
          ) : (
            <FollowButton title="Follow" onClick={() => {}} />
          )}

          <BiDotsHorizontal size={22} />
        </div>
        <div className="flex gap-6 text-xs text-neutral-600 font-bold lg:text-sm">
          <div className="flex flex-row gap-1">
            <span className="text-neutral-900 font-semibold font-roboto">
              {user.Posts.length ? user.Posts.length : 0}
            </span>
            <span>Posts</span>
          </div>
          <div className="flex flex-row gap-1">
            <span className="text-neutral-900 font-semibold font-roboto">
              {user.following.length ? user.following.length : 0}
            </span>
            <span onClick={FollowingOnOpen} className="cursor-pointer text-neutral-800 hover:text-neutral-500">
              Followings
            </span>
            {/* modal */}
            <FollowingModal isFollowing users={user.following}/>
          </div>
          <div className="flex flex-row gap-1">
            <span className="text-neutral-900 font-semibold font-roboto">
              {user.followers.length ? user.followers.length : 0}
            </span>
            <span
              className="cursor-pointer text-neutral-800 hover:text-neutral-500"
              onClick={FollowersOnOpen}
            >
              Followers
            </span>
            <FollowersModal  users={user.followers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header