import { create } from "zustand";
interface HookProps {
  FollowingIsOpen: boolean;
  FollowingOnClose: () => void;
  FollowingOnOpen: () => void;
}
const useFollowingModal = create<HookProps>((set) => ({
  FollowingIsOpen: false,
  FollowingOnClose: () => set({ FollowingIsOpen: false }),
  FollowingOnOpen: () => set({ FollowingIsOpen: true }),
}));
export default useFollowingModal;
