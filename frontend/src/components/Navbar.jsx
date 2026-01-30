import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo" onClick={() => navigate("/")}>
          Moodgram
        </span>
      </div>

      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Create</Link>
        <Link to="/top" className="nav-link">Top</Link>
        <Link to="/profile" className="nav-link">Profile</Link>

        {token && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
