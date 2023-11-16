import { getProfileInfo } from '@/app/actions/getProfile';
import { getUser } from '@/app/actions/user';
import User from '@/app/components/User';
import MainLayout from '@/app/components/layout/MainLayout';
import Item from '@/app/components/profileContent/Item';
import Profile from '@/app/components/profileContent/Profile';
import { BiDotsHorizontal } from 'react-icons/bi';



const profilePage =async ({ params }: { params: { id: string } }) => {
  console.log(params.id,'id ')
  const user=await getProfileInfo(params.id);
  const currentUser=await getUser()
  console.log(user,'profile')
  return (
    <MainLayout>
      <Profile user={user} currentUser={currentUser} />
    </MainLayout>
  );
};

export default profilePage;
