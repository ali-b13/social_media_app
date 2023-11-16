import { create } from "zustand";
interface HookProps {
  FollowersIsOpen: boolean;
  FollowersOnClose: () => void;
  FollowersOnOpen: () => void;
}
const useFollowersModal = create<HookProps>((set) => ({
  FollowersIsOpen: false,
  FollowersOnClose: () => set({ FollowersIsOpen: false }),
  FollowersOnOpen: () => set({ FollowersIsOpen: true }),
}));
export default useFollowersModal;
