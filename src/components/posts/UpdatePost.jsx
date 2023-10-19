import React,{ useContext, useState } from 'react'
import { Button, Modal, Form, Dropdown } from 'react-bootstrap'
import axiosService from "../../helpers/axios"
import Toaster from "../Toaster"


const UpdatePost = (props) => {
    const { post, refresh } = props 
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [form, setForm] = useState({
        author: post.author.id,
        body: post.body
    })

    // const {setToaster} = useContext(Context)


    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const handleSubmit = (e) => {
        e.preventDefault()

        const updatePostForm = e.currentTarget 

        if(updatePostForm.checkValidity() === false){
            e.stopPropagation()
        }

        setValidated(true)

        const data ={
            author: form.author,
            body: form.body
        }


        axiosService.put(`/post/${post.id}/`, data).then(() => {
            handleClose()
            // setToaster({
            //     type: 'success',
            //     message: "Post updated 🚀",
            //     show: true,
            //     title: "post error"
            // })
        })

    }

  return (
    <>
    <Dropdown.Item onClick={handleShow}>Modify</Dropdown.Item>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0'>
            <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className='border-0'>
            <Form 
            noValidate 
            validated={validated}
            onSubmit={handleSubmit}
            data-testid='update-post-form'>
                <Form.Group className="mb-3">
                    <Form.Control
                    name='body'
                    value={form.body}
                    data-testid='post-body-field'
                    onChange={(e) => setForm({...form, body: e.target.value})}
                    as='textarea'
                    rows={3}></Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
            data-testid="update-post-submit"
            variant='primary'
            onClick={handleSubmit}>
                Modify
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default UpdatePost