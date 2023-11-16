import {getUser} from "../actions/user";
import RippleButton from "../components/Buttons/RippleButton";
import ListToFollow from "../components/ListToFollow";
import FollowingList from "../components/feed/FollowingList"


const page=async()=>{
    const user=await getUser()
     
    return (
      <div className="flex justify-center pt-6">
        <ListToFollow user={user} />
      </div>
    );
}
export default page