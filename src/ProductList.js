import React, { useEffect, useState } from 'react';
import Header from './Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Button, Alert,Form ,InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
 // Import useAlert

export default function ProductList() {
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
 // Use the alert context

  useEffect(() => {
    getData();
  }, []);

  async function deleteProduct(id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this product?');

    if (!shouldDelete) {
      return; // User canceled the deletion
    }

    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      console.warn('Product deleted successfully');
      setShowAlert(true);
      getData();
 // Show the alert
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  async function getData() {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api/list');
        setData(result.data);
      // Hide the alert when fetching new data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }

  return (
    <>
      <Header />
      <h1>Product list</h1>
      
      {/* search button */}




      <div className="col-md-8 mx-auto mt-3">
        {/* Bootstrap Alert */}
        {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                Data has been deleted successfully!
              </Alert>
            )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           
            {data.map((item,index) => (
              
              <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img src={'http://localhost:8000/' + item.file_path} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                </td>
                <td>
                  <Button className="btn btn-sm btn-danger" onClick={() => deleteProduct(item.id)}>
                    Delete
                  </Button>
                  <Link to={`/update/${item.id}`}>
                    <Button className="btn btn-sm btn-info mx-3">Update</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
