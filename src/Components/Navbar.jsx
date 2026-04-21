import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          BookLoop
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search books, authors..."
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
        </form>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/sell" className="btn-sell">Sell Book</Link>
          <Link to="/dashboard" className="btn-ghost">Dashboard</Link>
          <Link to="/login" className="btn-login">Login</Link>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
