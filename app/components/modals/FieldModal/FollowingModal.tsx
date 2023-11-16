import React from "react";
import useFollowersModal from "@/app/hooks/useFollowersModal";
import FieldModal from "./FieldModal";
import ListUsers from "../../profileContent/ListUsers";
import useFollowingModal from "@/app/hooks/useFollowingModal";

const FollowingModal = ({ users }: any) => {
  const { FollowingOnClose, FollowingIsOpen } = useFollowingModal();
  const body = (
    <div>
      <ListUsers users={users} />
    </div>
  );
  return (
    <FieldModal
      noButtons
      isLoading
      isOpen={FollowingIsOpen}
      onClose={FollowingOnClose}
      onSubmit={() => {}}
      body={body}
      title="Following"
    />
  );
};

export default FollowingModal;
