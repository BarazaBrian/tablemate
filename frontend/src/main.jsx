import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Customers from './pages/Customers.jsx';
import Reservations from './pages/Reservations.jsx';
import ResTables from './pages/ResTables.jsx';
import Staff from './pages/Staff.jsx';

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/restables" element={<ResTables />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);