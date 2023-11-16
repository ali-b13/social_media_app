import React from 'react'
import useFollowersModal from '@/app/hooks/useFollowersModal'
import FieldModal from './FieldModal'
import ListUsers from '../../profileContent/ListUsers'

const FollowersModal = ({users}:any) => {
    const {FollowersOnClose,FollowersIsOpen}=useFollowersModal()
    const body=(
    <div>
        <ListUsers users={users}/>
    </div>)
  return (
    <FieldModal noButtons isLoading isOpen={FollowersIsOpen} onClose={FollowersOnClose} onSubmit={()=>{}} body={body} title='Followers' />
  )
}

export default FollowersModal