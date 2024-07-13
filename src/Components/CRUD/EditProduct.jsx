import axios from "axios";
import React, { useId, useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductsContext from "../../ContextAPIs/ProductsContext";
import { UsersContext } from "../../ContextAPIs/UsersContext";
function EditProducts() {
  const navigate=useNavigate();
  const {CurrentUser}=useContext(UsersContext);
  useEffect(()=>{
    if(CurrentUser?.role!=="admin"){
      navigate("/404");
    }
  },[]);
  const inputRef = useRef(null);
  const {deleteProduct,editProduct}=useContext(ProductsContext);
  let [prdct, setPrdct] = useState({
    id: useId(),
    title: "",
    price: 0,
    discountPercentage: 0,
    description: "",
    stock: 0,
    thumbnail:
      "https://www.energyfit.com.mk/wp-content/plugins/ap_background/images/default/default_large.png",
    category: "",
  });
  let navigator = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    let prodct = () => {
      axios
        .get(`http://localhost:5000/products/${id}`)
        .then((res) =>
          setPrdct({
            id: res.data.id,
            title: res.data.title,
            price: res.data.price,
            discountPercentage: res.data.discountPercentage,
            description: res.data.description,
            stock: res.data.stock,
            thumbnail: res.data.thumbnail,
            category: res.data.category,
          })
        )
        .catch((err) => console.log(err));
    };
    prodct();
  }, [id]);
  let handleChange = (e) => {
    let { name, value } = e.target;
    setPrdct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let handleSubmit = (e) => {
    editProduct(prdct.id,prdct);
    e.preventDefault();
    navigator("/shop");
  };
  let handleDelete=()=>{
    deleteProduct(id);
    navigator("/Shop");
  }
  return (
    <div
      className="mt-3 p-5 container w-75 mb-5"
    >
      <h1 className="text-center text-success pb-4">
        Edit Product
      </h1>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="form-floating mb-3  ">
          <input
            type="text"
            className="form-control "
            id="title"
            name="title"
            value={prdct.title}
            onChange={handleChange}
            ref={inputRef}
          />
          <label htmlFor="title">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={prdct.price}
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="discountPercentage"
            name="discountPercentage"
            value={prdct.discountPercentage}
            onChange={handleChange}
          />
          <label htmlFor="discountPercentage">Discount Percentage</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={prdct.stock}
            onChange={handleChange}
          />
          <label htmlFor="stock">Quantity</label>
        </div>
        <div className=" form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={prdct.category}
            onChange={handleChange}
          />
          <label htmlFor="category">Category</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={prdct.description}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
        </div>
        <div className=" form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            value={prdct.thumbnail}
            onChange={handleChange}
          />
          <label htmlFor="thumbnail">Image Url</label>
        </div>
        <div className="mb-3">
          <div className="text-center">
            <button
              className="btn btn-success mx-2 text-light px-5 py-2 b-0 "
            >
              Edit
            </button>
            <button
              className="btn btn-danger mx-2 text-light px-5 py-2 b-0 "
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProducts;
