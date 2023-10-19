import React, { useState, useContext } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import axiosService from '../../helpers/axios'
import { getUser } from '../../hooks/use.actions'
import { randomAvatar } from '../../utils'
import { Context } from '../Layout'



const CreateComment = (props) => {
    const { postId, refresh } = props


  return (
    <Form>
        
    </Form>
  )
}

export default CreateComment