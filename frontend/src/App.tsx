import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import Register from './pages/Register';
import Login from './pages/Login';
import UserEdit from './pages/users/UserEdit';
import Roles from './pages/roles/Roles';
import RoleCreate from './pages/roles/CreateRole';
import RoleUpdate from './pages/roles/UpdateRole';
import Products from './pages/products/Products';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';
import Orders from './pages/orders/Orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id/edit" element={<UserEdit/>} />
        <Route path="/roles" element={<Roles/>} />
        <Route path="/roles/create" element={<RoleCreate/>} />
        <Route path="/roles/:id/edit" element={<RoleUpdate/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/create" element={<ProductCreate/>} />
        <Route path="/products/:id/edit" element={<ProductEdit/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
    </div>
  );
}

export default App;
