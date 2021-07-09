import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">Contact List App</div>
      </div>
      <div className="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <Link to="/">About</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/addcontact">Add Contact</Link>
        <Link to="/profile">My Profile</Link>
      </div>
    </div>
  );
}
