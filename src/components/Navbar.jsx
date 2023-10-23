import React from 'react'
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { getUser } from '../hooks/use.actions'

const NavigationBar = () => {
    const navigate = useNavigate()
    const user = getUser()

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
                        <Image src={user.avatar} 
                        roundedCircle 
                        width={36}
                        height={36}/>
                    }>
                    <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}></NavDropdown.Item> 
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavigationBar