import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/add');
    }
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUp(e) {
    e.preventDefault();
    setLoading(true);
    const input = { name, email, password };

    try {
      // Using Axios for the POST request
      const response = await axios.post(
        'http://localhost:8000/api/register',
        input,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const result = response.data;
      localStorage.setItem('user-info', JSON.stringify(result));

      navigate('/add');
    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Register</Card.Title>
            <Form onSubmit={(e) => signUp(e)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
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
                disabled={loading}
                className="w-100 mt-3"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
            <span>Already registered? <a href='/login'>Login here</a></span> 
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Register;
