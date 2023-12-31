import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Container, Form, Button, Card,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }


  }, [])

  async function login(e) {
e.preventDefault()
    const input = { email, password };
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      const result = response.data;
      if(result){
        localStorage.setItem('user-info', JSON.stringify(result));
        navigate('/');
      }
      else{
        setShowAlert(true);
        navigate('/login');
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, show a message, etc.
      navigate('/login');
    }
  }
  
  return (
    <>
      <Header />
  
      <Container className="d-flex justify-content-center align-items-center vh-80 mt-5">
        <Card style={{ width: '400px' }}>
        {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Incorrect Password or Email
              </Alert>
            )}
          <Card.Body>
            <Card.Title className="text-center mb-4">Login</Card.Title>

         
            <Form >


              <Form.Group className="mb-3" controlId="formBasicEmail">
             
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
               
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>


              <Button
                variant="primary"
                type="submit"
                onClick={(e)=>login(e)}
                className="w-100 mt-3"
              >
                Login
              </Button>
            </Form>
            <span>You don't have an account? <a href='/register'>Register here</a></span>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
