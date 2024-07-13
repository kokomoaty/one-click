import { Link } from "react-router-dom";
import { useContext} from "react";
import { UsersContext } from "../../ContextAPIs/UsersContext";
import { useLocation } from "react-router-dom";
export default function Navbar() {
  const {CurrentUser}=useContext(UsersContext);
  const location = useLocation();
  return (
    <div className={`App`}>
    <nav
      className={`navbar navbar-expand-lg sticky-top bg-dark ${location.pathname==="/404"?"d-none":""}`}
    >
      <div className="container-fluid" >
        <Link className="navbar-brand" to="/Home">
        <span className="my-0 text-white" style={{
            fontFamily:"'Lobster', cursive",
            fontSize:"2em"
          }}><span className="text-success">One</span>-Click</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto gap-3 fs-5 me-5">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/shop">
                Shop
              </Link>
            </li>
            <li className={`nav-item ${CurrentUser===null?"d-none":CurrentUser.role==='admin'?"":"d-none"}`}>
              <Link to="/addProduct" className="nav-link text-white">
                Add Product
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contactus" className="nav-link text-white">
                Conact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </Link>
            </li>
            {
              CurrentUser!==null?
              <li className={`nav-item`}>
              <button className="btn btn-outline-success">
              <Link to="/profile" className="nav-link text-white fw-bold">
                {CurrentUser?.id} <img src={require("../../Images/user/icons8-user-24.png")} alt="" />
              </Link>
              </button>
            </li>
            :
            <li className={`nav-item`}>
            <div className="btn-group">
            <button className="btn btn-outline-secondary">
            <Link to="/Login" className="nav-link text-white fw-bold">
              Login
            </Link>
            </button>
            <button className="btn btn-light">
            <Link to="/Signin" className="nav-link text-success fw-bold">
              Signup
            </Link>
            </button>
            </div>
          </li>
            }
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}
