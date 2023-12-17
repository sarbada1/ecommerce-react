import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Container,Alert } from 'react-bootstrap';
 // Import useAlert

function UpdateProduct() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  // Use the alert context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/getproduct/${id}`);
        setData(result.data);
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setFile(result.file);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  async function update(e, id) {
    e.preventDefault();

    const formdata = new FormData();

    if (name !== undefined) {
      formdata.append('name', name);
    }

    if (price !== undefined) {
      formdata.append('price', price);
    }

    if (description !== undefined) {
      formdata.append('description', description);
    }

    if (file !== undefined) {
      formdata.append('file', file);
    }

    try {
      let result = await axios.post(`http://localhost:8000/api/update/${id}?_method=PUT`, formdata);
      if (result) {
        setShowAlert(true);
        
       // Show the alert
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center vh-100 ">
        <Card style={{ width: '400px' }}>
          <Card.Header as="h5">Update Product</Card.Header>
          <Card.Body>
            {/* Bootstrap Alert */}
            {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                Data has been updated successfully!
              </Alert>
            )}

            <Form>
              <Form.Group className="mb-3" controlId="formProductName">
             
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  defaultValue={data.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formProductPrice">
    
                <Form.Control
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter product price"
                  defaultValue={data.price || ''}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formProductDescription">

                <Form.Control
                  as="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Enter product description"
                  defaultValue={data.description || ''}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formProductImage">
             
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  defaultValue={data.file_path || ''}
                />
                <img src={'http://localhost:8000/' + data.file_path} width="100px" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={(e) => update(e, data.id)}>
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
