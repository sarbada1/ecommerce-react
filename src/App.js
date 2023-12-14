
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Login';
import Register from './Register';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import Protected from './Protected';


function App() {
  return (

    <div className="App">
      <Router>
        

     
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route
            path="/add"
            element={<Protected><AddProduct /></Protected>}
          />
          <Route
            path="/update"
            element={<Protected><UpdateProduct /></Protected>}
          />
        
        </Routes>

      </Router>
    </div>
  );
}

export default App;
