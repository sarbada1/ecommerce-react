import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Container } from 'react-bootstrap';

function UpdateProduct() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/getproduct/${id}`);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '400px' }}>
          <Card.Header as="h5">Update Product</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  defaultValue={data.name || ''}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formProductPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  defaultValue={data.price || ''}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  defaultValue={data.description || ''}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default UpdateProduct;
