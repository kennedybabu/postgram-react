import React,{ useContext, useState } from 'react'
import {Form, Button, Image } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

import { useUserActions } from '../../hooks/use.actions'
import { Context } from "../Layout"


const UpdateProfileForm = (props) => {
    const {profile} = props
    const [validated, setValidated] = useState(false)
    const [form, setForm] = useState(profile)
    const [error, setError] = useState(null)
    const userActions = useUserActions()
    const [avatar, setAvatar] = useState()
    const navigate = useNavigate()
    const {setToaster} = useContext(Context) 


    const handleSubmit = (e) => {
        e.preventDefault()
        const updateProfileForm = e.currentTarget 

        if(updateProfileForm.checkValidity() === false) {
            e.stopPropagation()
        }

        setValidated(true)

        const data = {
            first_name: form.first_name,
            last_name: form.last_name,
            bio: form.bio
        }

        const formData = new FormData()

        Object.keys(data).forEach((key) => {
            if(data[key]) {
                formData.append(key, data[key])
            }
            if(avatar){
                formData.append('avatar', avatar)
            }
        })

        userActions.edit(formData, profile.id).then(() => {
            setToaster({
                type:'success',
                message: 'Profile updated successfully 🚀',
                show: true,
                title: "profile updated"                
            })
            navigate(-1)
        }).catch((err) => {
            if(err.message) {
                setError(err.request.response)
            }
        })
    }
  return (
    <Form
    id='registration-form'
    className='border p-4 rounded'
    noValidate
    validated={validated}
    onSubmit={handleSubmit}>
        <Form.Group className='mb-3 d-flex flex-column'>
            <Form.Label className='text-center'>Avatar</Form.Label>
            <Image 
            src={form.avatar}
            roundedCircle
            width={120}
            height={120}
            className='m-2 border border-primary border-2 align-self-center'/>
            <Form.Control 
            onChange={(e) => setAvatar(e.target.files[0])}
            className='w-50 align-self-center'
            type='file'
            size='sm' /> 
            <Form.Control.Feedback type='invalid'>
                This file is required
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>First Name</Form.Label>
            <Form.Control value={form.first_name}
            onChange={(e) => setForm({...form, first_name: e.target.value})}
            required 
            type='text'
            placeholder='Enter first name'/>
            <Form.Control.Feedback type='invalid'>
                This field is required
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
            value={form.last_name}
            onChange={(e)=> setForm({...form,last_name: e.target.value})}
            required 
            type='text'
            placeholder='Enter last name' />
            <Form.Control.Feedback type='invalid'>
                This field is required
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Bio</Form.Label>
            <Form.Control 
            value={form.bio}
            onChange={(e) => setForm({...form, bio: e.target.value})} 
            as='textarea' 
            rows={3}
            placeholder='A simple bio...(optional)'/>
        </Form.Group>
        <div className="text-content text-danger">
            {error && <p>{error}</p>}
        </div>
        <Button variant='primary' size='sm' type='submit'>save chanes</Button>
        
    </Form>
  )
}

export default UpdateProfileForm