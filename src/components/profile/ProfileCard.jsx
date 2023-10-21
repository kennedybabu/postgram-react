import React from 'react'
import { Card, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfileCard = (props) => {
    const navigate = useNavigate()
    const {user} = props


    console.log(user)


    const handleNavigationProfile = () => {
        navigate(`/profile/${user.id}`)
    }
  return (
    <Card className='border-0 p-2'>
        <div className="d-flex">
            <Image 
            src={user.avatar} 
            roundedCircle 
            width={48}
            height={48}
            className='my-3 border border-primary border-2'/>
            <Card.Body>
                <Card.Title className='fs-6'>{user.first_name} {user.last_name}</Card.Title>
                <Button variant='primary' size='sm' onClick={handleNavigationProfile}>
                    see profile
                </Button>
            </Card.Body>
        </div>
    </Card>
  )
}

export default ProfileCard