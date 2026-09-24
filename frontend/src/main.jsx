import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './pages/Dashboard.jsx';
import Customers from './pages/Customers.jsx';
import Reservations from './pages/Reservations.jsx';
import ResTables from './pages/ResTables.jsx';
import Staff from './pages/Staff.jsx';

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Dashboard />
    <Customers/>
    <Reservations/>
    <ResTables/>
    <Staff/>
    </>
  </StrictMode>
);