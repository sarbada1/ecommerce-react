import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">E-com</Navbar.Brand>

          <Nav className="me-auto nav-wrap">

            {
              localStorage.getItem('user-info') ?

                <>
                  <Link to="/add">Add product</Link>
                  <Link to="/update">Update product</Link>
                </>
                :
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
            }



          </Nav>
        </Container>
      </Navbar>


    </div>
  )
}

export default Header