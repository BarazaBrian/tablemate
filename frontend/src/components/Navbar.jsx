import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TableMate</Link>
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/reservations" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink to="/staff" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Staff
          </NavLink>
        </li>
        <li>
          <NavLink to="/restables" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>
            Tables
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
