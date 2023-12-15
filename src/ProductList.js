import React, { useEffect, useState } from 'react';
import Header from './Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);


  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      console.warn('Product deleted successfully');
      getData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
async function getData()
{
    const fetchData = async () => {
        try {
          const result = await axios.get("http://localhost:8000/api/list");
          setData(result.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
}
  return (
    <>
      <Header />
      <h1>Product list</h1>
      <div className='col-md-8 mx-auto mt-3'>

     
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img src={'http://localhost:8000/'+item.file_path}  style={{ maxWidth: '50px', maxHeight: '50px' }} />
              </td>
              <td>
                <Button className='btn btn-sm btn-danger' onClick={()=>deleteProduct(item.id)}>Delete</Button>
                <Link to={'/update/'+item.id}><Button className='btn btn-sm btn-info mx-3'>Update</Button></Link>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </>
  );
}
