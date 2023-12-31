import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProfileDetail = (props) => {
    const {user} = props
    const navigate = useNavigate()
    

    if(!user) {
        return <div>loading...</div>
    }

  return (
    <div>
        <div className="d-flex flex-row border-bottom p-5">
            <Image 
            src={user.avatar}
            roundedCircle 
            width={120}
            height={120}
            className='me-5 border border-primary border-2'/>
            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className='fs-4'>{user.first_name} {user.last_name}</p>
                <p className="fs-7 text-lighter m-0">
                    {user.bio ? user.bio : "(No bio.)"}
                </p>
                <p className="fs-6">
                    <small>{user.posts_count} posts</small>
                </p>
                <Button 
                variant='primary'
                size='sm'
                onClick={() => navigate(`/profile/${user.id}/edit/`)}>
                    Edit
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ProfileDetail