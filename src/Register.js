import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function Register() {

  useEffect(() => {
   if(localStorage.getItem('user-info'))
   {
    navigate('/add');
   }
  
   
  }, [])
  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signUp(e) {

      e.preventDefault();
      setLoading(true);
      const input = { name, email, password };

      // Using Axios for the POST request
      const response = await axios.post('http://localhost:8000/api/register', input, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const result = response.data;
      localStorage.setItem('user-info', JSON.stringify(result));

      
      navigate('/add');
  
  }

  return (
    <>
    <Header/>
    <div>
      <Container>
        <Form onSubmit={(e)=>signUp(e)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </Container>
    </div>
    </>
  );
}

export default Register;
