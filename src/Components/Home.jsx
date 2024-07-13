import React, { useContext } from "react";
import PostsContext from "../ContextAPIs/ProductsContext";
import { Link } from "react-router-dom";


export default function Home() {
  const { products, getProducts, deleteProduct } = useContext(PostsContext);
  return (
    <div>
      <div
        className="card text-bg-dark border-0 border border-radius-0"
        style={{ height: "fit-content" }}
      >
        <img
          src="https://images.pexels.com/photos/4482896/pexels-photo-4482896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="card-img" 
          alt="..."
          style={{
            height:"90vh",
            objectFit:"cover",
          }}
        />
        <div class="card-img-overlay p-5">
          <div className="d-flex flex-column align-items-center">
          <h1 className="my-0 text-dark" style={{
            fontFamily:"'Lobster', cursive",
            fontSize:"7em"
          }}><span className="text-success">One</span>-Click</h1>
          <p className="mb-5 text-dark fs-2 fst-italic fw-bold">Need it. Want it. Done.</p>
            <Link className="btn btn-success my-3 fs-3 rounded-3" to="/Shop">Shop Now</Link>
          </div>
        </div>
      </div>
          <div id="carouselExample" className="carousel slide w-50 m-auto my-5">
          <Link to="/Shop" className="text-decoration-none">
          <h1 className="text-center fs-1 my-5 fw-bold text-white">Products</h1>
          </Link>
  <div className="carousel-inner">
  {products?.map((prodcutItem) => {
            return (
              <div className={prodcutItem.id===1?"carousel-item active":"carousel-item"}>
              <Link to="/Shop">
              <img src={prodcutItem.thumbnail} style={{height:"50vh",objectFit:"contain"}}  className="d-block w-100" alt="..."/>
              </Link>
            </div>
            );
          })}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
  );
}

