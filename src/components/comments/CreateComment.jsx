import React, { useState, useContext } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import axiosService from '../../helpers/axios'
import { getUser } from '../../hooks/use.actions'
import { randomAvatar } from '../../utils'
import { Context } from '../Layout'



const CreateComment = (props) => {
    const { postId, refresh } = props
    const [avatar, setAvatar] = useState(randomAvatar())
    const [validated, setValidated] = useState(false)
    const [form, setForm] = useState({})


    const {toaster, setToaster} = useContext(Context)

    const user = getUser()

    const handleSubmit = (e) => {
        e.preventDefault()

        const createCommentForm = e.currentTarget 


        if(createCommentForm.checkValidity() === false){
            e.stopPropagation()
        }

        setValidated(true)  

        const data = {
            author: user.id, 
            post: postId,
            body: form.body
        }


        axiosService.post(`/post/${postId}/comment/`, data).then(() => {
            setForm({...form, body:''})
            setToaster({
                type:'success',
                message: 'Comment posted successfully 🚀',
                show: true,
                title: 'Comment'
            })
            refresh()
        }).catch(() => {
            setToaster({
                type:'danger',
                message: '',
                show: true,
                title: 'An error occured'
            })
        })

    }

  return (
    <Form className='d-flex flex-row justify-content-between' noValidate validated={validated} onSubmit={handleSubmit}>
        <Image 
        src={avatar}
        roundedCircle 
        width={48}
        height={48}
        className='my-2'/>
        <Form.Group className='m-3 w-75'>
            <Form.Control 
            className='py-2 rounded-pill border-primary'
            type='text'
            placeholder='Write a comment'
            value={form.body}
            name='body'
            onChange={(e) => setForm({ ...form, body: e.target.value })} />
        </Form.Group>
        <div className="m-auto">
            <Button 
            variant='primary'
            onClick={handleSubmit}
            disabled={form.body === undefined}
            size='small'>
                Comment
            </Button>
        </div>

    </Form>
  )
}

export default CreateComment