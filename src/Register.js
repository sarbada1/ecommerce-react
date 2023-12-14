import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function signUp() {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const input = { name, email, password };
  
      axios.post('http://localhost:8000/api/register', input, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => {
        const result = response.data;
        localStorage.setItem('user-info', JSON.stringify(result));
  
        console.log('Navigating to /add');
        // navigate('/add');
  
        // Resolve the promise with the result
        resolve(result);
      })
      .catch(error => {
        console.error('Error during registration:', error);
  
        // Reject the promise with the error
        reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
    });
  }
  return (
    <div>
      <Container>
        <Form onSubmit={signUp}>
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
  );
}

export default Register;
