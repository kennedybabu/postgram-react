import React, { useContext } from 'react'
import { format } from "timeago.js"
import { Image, Card, Dropdown } from 'react-bootstrap'
import axiosService from '../../helpers/axios'
import { getUser } from '../../hooks/use.actions'
import UpdateComment from './UpdateComment'
import { Context } from '../Layout'
import MoreToggleIcon from '../MoreToggleIcon'
import { LikeFilled, LikeOutlined } from "@ant-design/icons"




const Comment = (props) => {
    const {postId, comment, refresh} = props
    const { setToaster} = useContext(Context)
    const user = getUser()

    const handleDelete = () => {
        axiosService.delete(`/post/${postId}/comment/${comment.id}/`).then(() => {
            setToaster({
                type: 'danger',
                message: 'Comment deleted 🚀',
                show: true,
                title: "Comment Deleted"
            })
            refresh()
        }).catch((err) => {
            setToaster({
                type: 'warning',
                message: 'Comment deleted 🚀',
                show: true,
                title: "Comment Deleted"
            })
        })
    }


    const handleLikeClick = (action) => {
        axiosService.post(`/post/${postId}/comment/${comment.id}/${action}/`).then(() => {
            refresh()
        }).catch((err) => console.log(err))
    }


  return (
    <Card className='rounded-3 my-2' data-testid='comment-test'>
        <Card.Body>
            <Card.Title className='d-flex flex-row justify-content-between'>
                <div className="d-flex flex-row">
                    <Image 
                    src={comment.author.avatar}
                    roundedCircle
                    width={48}
                    height={48}
                    className='me-2 border border-primary border-2'/>
                    <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                        <p className="fs-6 m-0">{comment.author.name}</p>
                        <p className="fs-6 fw-lighter">
                            <small>{format(comment.created)}</small>
                        </p>
                    </div>
                </div>
                {user?.name === comment.author.name && (
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle as={MoreToggleIcon}>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <UpdateComment 
                                    comment={comment}
                                    refresh={refresh} 
                                    postId={postId}/>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleDelete} className='text-danger'>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </Card.Title>
            <Card.Text>{comment.body}</Card.Text>
            <div className="d-flex flex-row">
                <LikeFilled 
                style={{
                    color: '#ffff',
                    backgroundColor: '#0d6efd',
                    borderRadius: '50%',
                    width:'18px',
                    height: '18px',
                    fontSize:'75%',
                    padding: '2px',
                    margin: '3px'
                }}/>
                <p className="ms-1 fs-6">
                    <small>{comment.likes_count} like</small>
                </p>
            </div>
            <div className="d-flex flex-row">
                <LikeOutlined 
                style={{
                    width:'24px',
                    height: '24px',
                    padding:'2px',
                    fontSize:'20px',
                    color: comment.liked ? '#0D6EFD' : '#c4c4c4'
                }}
                onClick={() => {
                    if(comment.liked){
                        handleLikeClick('remove_like')
                    } else {
                        handleLikeClick('like')
                    }
                }}/>
                <p className='ms-1'>
                    <small>Like</small>
                </p>
            </div>
        </Card.Body>
    </Card>
  )
}

export default Comment