import React,{useState} from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from '../../helpers/axios'
import { getUser } from "../../hooks/use.actions";
import Toaster from "../Toaster"


function CreatePost(props){
    const {refresh} = props
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [form, setForm] = useState({
        body: ''
    })
    const user = getUser()
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //toaster
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState('')

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const createPostForm = e.currentTarget 

        if(createPostForm.checkValidity() === false) {
            e.stopPropagation()
        }

        setValidated(true)

        const data = {
            author: user?.id,
            body: form.body
        }


        axiosService.post("/post/", data).then(() => {
            handleClose()
            setToastMessage('Post created 🚀')
            setToastType('success')
            setForm({})
            refresh()
            setShowToast(true)
        }).catch(() =>{
            setToastMessage('An error occured')
            setToastType('danger')
        })
    }


    return(
        <>
            <Form.Group className="my-3 w-75">
                <Form.Control 
                className="py-2 rounded-pill border-primary text-primary"
                type="text" 
                placeholder="Write a post"
                onClick={handleShow}>
                </Form.Control>
            </Form.Group>

            {/* Add modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                            name="body"
                            value={form.body} 
                            onChange={(e) => setForm({...form, body:e.target.value})}
                            as="textarea"
                            rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                    onClick={handleSubmit} 
                    disabled={form.body === undefined}>
                    post
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster 
            title='Post!'
            message={toastMessage}
            showToast={showToast} 
            type={toastType} 
            onClose={() => setShowToast(false)}/>
        </>
    )
}


export default CreatePost