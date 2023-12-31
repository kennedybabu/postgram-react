import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import Layout from '../components/Layout'
import UpdateProfileForm from '../components/comments/UpdateProfileForm'
import { fetcher } from '../helpers/axios'
import { Row, Col } from 'react-bootstrap'



const EditProfile = () => {
    const { profileId } = useParams() 
    const profile = useSWR(`/user/${profileId}/`, fetcher)
  return (
    <Layout hasNavigtionBack>
        {profile.data ? (
            <Row className='justify-content-evenly'>
                <Col sm={9}>
                    <UpdateProfileForm profile={profile.data} />
                </Col>
            </Row>
        ): (
            <div>Loading...</div>
        )}
    </Layout>
  )
}

export default EditProfile