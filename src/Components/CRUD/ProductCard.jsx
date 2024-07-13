import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UsersContext } from "../../ContextAPIs/UsersContext";
import { CartContext } from "../../ContextAPIs/CartContext";

export default function ProductCard({
  product,
  deleteProduct,
  getProducts,
  getProductsById,
}) {
  const {CurrentUser}=useContext(UsersContext);
  const {AddToCart}=useContext(CartContext);
  let qty = 1;
  const addItem = async (a, b, c) => {
    let isExisting = false;
    const result = await axios.get("http://localhost:5000/orderItem");
    if (result.data.length === 0) {
      const order = { title: a, price: b, qty: qty, image: c };
      axios.post(`http://localhost:5000/orderItem`, order);
    } else {
      result.data.map((orderItem) => {
        if (a === orderItem.title) {
          orderItem.qty += 1;
          const order = {
            title: a,
            price: b,
            qty: orderItem.qty,
            image: c,
          };
          axios.put(`http://localhost:5000/orderItem/${orderItem.id}`, order);
          isExisting = true;
        }
      });
      if (isExisting === false) {
        const order = {
          title: a,
          price: b,
          qty: qty,
          image: c,
        };
        axios.post(`http://localhost:5000/orderItem`, order);
      }
    }
  };
  return (
    <div className="col">
    <div className="card p-0 border-0" key={product.id}>
      <div className="position-relative">
        {/*     {userData.role === "admin" && (
        )}  */}
        <Link to={`/shop/${product.id}`}>
          <img
            src={product.thumbnail}
            className="card-img-top object-fit-cover"
            alt="Product-img"
            height="300"
          />
        </Link>
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text fw-bold">
          $
          {(
            product.price -
            (product.price * product.discountPercentage) / 100
          ).toFixed(2)}
          {product.discountPercentage > 0 ? (
            <span className="text-secondary mx-2 text-decoration-line-through"> ${product.price}</span>
          ) : null}
        </p>
          {
            CurrentUser?.role==="admin"?
            <Link to={`/edit/${product.id}`} className={`btn btn-dark px-5`}>
            Edit
          </Link>
          :
          <></>
          }
        <button
          className="btn btn-dark w-50 mx-auto ms-1"
          onClick={() =>
            // addItem(product.title, product.price, product.thumbnail)
            AddToCart(product.id)
          }
        >
          Add To Cart{/* {cartItemAmount > 0 && <>()</>} */}
        </button>
      </div>
    </div>
    </div>
  );
}
