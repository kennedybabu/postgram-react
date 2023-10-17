import React from 'react'
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { randomAvatar } from '../utils'

const NavigationBar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('auth')
        navigate("/login/")
    }    


  return (
    <Navbar bg='primary' variant='dark'>
        <Container>
            <Navbar.Brand className='fw-bold' href='#home'>Postgram</Navbar.Brand>
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    <NavDropdown 
                    title={
                        <Image src={randomAvatar()} 
                        roundedCircle 
                        width={36}
                        height={36}/>
                    }/>
                    <NavDropdown.Item href="#">Profile</NavDropdown.Item> 
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavigationBar