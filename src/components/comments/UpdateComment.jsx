import React, { useContext, useState } from 'react'
import { Button, Modal, Form, Dropdown } from 'react-bootstrap'
import axiosService from '../../helpers/axios'
import { Context } from '../Layout'



const UpdateComment = (props) => {
  const {postId, comment, refresh } = props
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const [form, setForm] = useState({
    author: comment.author.id,
    body: comment.body,
    post: postId
  })

  const {setToaster} = useContext(Context)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  

  const handleSubmit = (e) => {
    e.preventDefault()

    const updateForm = e.currentTarget 

    if(updateForm.checkValidity() === false){
      e.stopPropagation()
    }


    setValidated(true) 

    const data = {
      author: form.author, 
      post: postId,
      body: form.body
    }

    axiosService.put(`/post/${postId}/comment/${comment.id}/`, data).then(() => {
      handleClose()
      setToaster({
        type: 'success',
        message:'Comment updated 🚀',
        show: true, 
        title: "Success"
      })
      refresh()
    }).catch((error) => {
      setToaster({
        type: 'danger',
        message:'An error occured',
        show: true, 
        title: "Comment Error"
      })
    })
  }
  return (
    <>
    <Dropdown.Item data-testid='show-modal-form' onClick={handleShow}>Modify</Dropdown.Item>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='border-0'>
        <Modal.Title>Update Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body className='border-0'>
        <Form data-testid='update-comment-form' noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Control 
            name='body'
            value={form.body}
            onChange={(e) => setForm({...form, body: e.target.value })} 
            as='textarea' 
            rows={3}
            data-testid='comment-body-field' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleSubmit} data-testid='submit-button'>Modify</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default UpdateComment