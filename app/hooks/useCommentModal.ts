import {create} from 'zustand'
interface HookProps {
  isOpen:boolean;
  onClose:()=>void
  onOpen:()=>void;
  post:any
  isLiked_and_counts:{counts:number,isLiked:boolean}
  setIsLiked_and_counts:(count:number,isLiked:boolean)=>void;
  setPost:(post:any)=>void;
}
const useCommentModal=create<HookProps>((set)=>({
  isOpen:false,
  isLiked:false,
  isLiked_and_counts:{counts:0,isLiked:false},
  setIsLiked_and_counts:(count:number,liked:boolean)=>set({isLiked_and_counts:{counts:count,isLiked:liked}}),
  onClose:()=>set({isOpen:false}),
  onOpen:()=>set({isOpen:true}),
  post:{},
  setPost:(post:any)=>set({post:post})
}))
export default useCommentModal;