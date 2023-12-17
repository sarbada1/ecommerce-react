import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Header from './Header';


function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  async function addProduct(e) {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('price', price);
    formdata.append('description', description);
    formdata.append('file', file);

    try {
      let result = await fetch('http://localhost:8000/api/addproduct', {
        method: 'POST',
        body: formdata,
      });

      if (result) {
        setShowAlert(true);
        // Clear the form data
        setName('');
        setPrice('');
        setDescription('');
        setFile('');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: '400px' }}>
          <Card.Header as="h5">Add Product</Card.Header>
          <Card.Body>
            {/* Bootstrap Alert */}
            {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                Data has been saved successfully!
              </Alert>
            )}

            <Form>
              <Form.Group className="mb-3" controlId="formProductName">
              
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductPrice">
                
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductDescription">
                
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductImage">
                
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={(e) => addProduct(e)}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AddProduct;
