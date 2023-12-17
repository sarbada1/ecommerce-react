import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'


function Header() {

const user=JSON.parse(localStorage.getItem('user-info'))
const navigate = useNavigate();
function logout()
{
  localStorage.clear();
  navigate('/login')
}

  return (
    <div>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">E-com</Navbar.Brand>

          <Nav className="me-auto nav-wrap">

            {
              localStorage.getItem('user-info') ?

                <>
                  <Link to="/"> Product List</Link>
                  <Link to="/add">Add product</Link>
                  <Link to="/search">Search product</Link>
               
                </>
                :
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
            }



          </Nav>
          {localStorage.getItem('user-info')?
          <Nav>
            <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          :null  }
         
        </Container>
      </Navbar>


    </div>
  )
}

export default Header