import React, { useState } from 'react';
import { Form, Container, Alert } from 'react-bootstrap';
import Header from './Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Search() {
    const [data, setData] = useState([]);
    const [noData, setNoData] = useState(false);

    async function searchProduct(key) {
        try {
            if (key.trim() === "") {
                // Don't make a request if the key is empty
                setData([]);
                return;
            }

            let result = await axios.get(`http://localhost:8000/api/search/${key}`);
            console.warn(result.data); // Log the actual data

            if (result.data.length === 0) {
                setNoData(true);
            } else {
                setNoData(false);
                setData(result.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <Header />
            <Container className='w-25 mt-4'>
                <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Control type="text" onKeyUp={(e) => searchProduct(e.target.value)} placeholder="Search" />
                </Form.Group>
            </Container>
            <Container className="align-items-center mt-5">
                {noData ? (
                    <Alert variant="info">
                        No product found.
                    </Alert>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <img src={'http://localhost:8000/' + item.file_path} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </>
    );
}

export default Search;
