import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import Header from './Header';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');

 async function addProduct(e) {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, price, description, file });

  const formdata=new FormData();
  formdata.append("name",name);
  formdata.append("price",price);
  formdata.append("description",description);
  formdata.append("file",file);

  let result=await fetch("http://localhost:8000/api/addproduct",{
    method:"POST",
    body:formdata
  })
  alert("Data has been saved successfully")
  };

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }}>
          <Card.Header as="h5">Add Product</Card.Header>
          <Card.Body>
            <Form >
              <Form.Group className="mb-3" controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProductImage">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={(e)=>addProduct(e)}>
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
