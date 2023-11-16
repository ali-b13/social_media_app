import {create} from 'zustand'
interface HookProps {
  isOpen:boolean;
  onClose:()=>void
  onOpen:()=>void;
}
const useCreatePostModal=create<HookProps>((set)=>({
  isOpen:false,
  onClose:()=>set({isOpen:false}),
  onOpen:()=>set({isOpen:true})
}))
export default useCreatePostModal;