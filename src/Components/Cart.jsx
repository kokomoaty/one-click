import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState([]);
  useEffect(() => {
    loadItems();
  }, []);
  var totalPrice = 0;
  const loadItems = async () => {
    const result = await axios.get("http://localhost:5000/orderItem");
    setItems(result.data);
    result.data.map((prices) => {
      totalPrice += prices.qty * Number(prices.price);
    });
    setTotal(totalPrice.toFixed(2));
  };
  const deleteOrder = async (id) => {
    let isDelete = window.confirm(
      "Are you Sure? This Item will be removed from your order!"
    );
    if (isDelete) {
      await axios.delete(`http://localhost:5000/orderItem/${id}`);
      loadItems();
    }
  };
  const incDec = async (a, b, c, d, e,x) => {
    if (c === "dec") {
      if (a === 1) {
        a = 1;
      } else {
        a -= 1;
      }
    } else {
      if (a === 20) {
        a = 20;
        alert("Quantity Cannot Exceed 20!");
        return;
      } else {
        a += 1;
      }
    }
    const order = { title: d, price: e, qty: a ,image:x};
    await axios.put(`http://localhost:5000/orderItem/${b}`, order);
    loadItems();
  };
  return (
    <div className="container">
      <div className="row">

        <div className="col-8 m-auto py-3">

          <table className="table table-hover table-dark table-borderless align-middle text-center">
            <thead class="bg-light text-dark">
              <th>Product</th>
              <th>Title</th>
              <th className="">quantity </th>
              <th  className="">price</th>
              <th></th>
            </thead>
            <tbody>
            {items.map((item, index) => (
              
                <tr key={index}>
                  <td>
                    <img src={item.image} alt="" style={{maxWidth:"10rem",height:"10rem",objectFit:"contain"}}/>
                  </td>
                  <td>{item.title}</td>
                  <td className="px-5 ">
                    <div className="input-group ">
                    <button
                      className="btn btn-danger "
                      onClick={() =>
                        incDec(item.qty, item.id, "dec", item.title, item.price, item.image)
                      }
                    >
                      -
                    </button>
                    <input type="text" className="form-control text-center bg-dark text-white border-0 fs-4" value={item.qty} />
                    <button className="btn btn-success"
                      onClick={() =>
                        incDec(item.qty, item.id, "inc", item.title, item.price,item.image)
                      }
                    >
                      +
                    </button>
                    </div>
                    
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => deleteOrder(item.id)}
                    >
                      <img width="48" height="48" src="https://img.icons8.com/color/48/delete-forever.png" alt="delete-forever"/>
                    </button>
                  </td>
                </tr>
              
            ))}
            </tbody>
          </table>
        </div>
        <div className="col-3 " style={{backgroundColor:"#f1e5c5"
      ,marginLeft:"30px",
      width:"390px", height:"700px"
    
      }}>

        <form className="" >

          <div className="">
            <h1 style={{ color: "rgb(31, 55, 82)" ,fontSize:"35px"}}>
              Customer Data
            </h1>
            <hr></hr>
            <div className="card-body" style={{}}>
              <div className="row">
        
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name </label>
                    <input
                      className="form-control" type="text"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                   type="email" ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone </label>
                    <input
                      className="form-control"  type="number"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      className="form-control"
                    >
                      <option value="india">Egypt</option>
                      <option value="usa">USA</option>
                      <option value="singapore">dubi</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Promo Code </label>
                    <input
                      className="form-control"  type="text"
                    ></input>
                  </div>
                </div>
              </div>
              <hr />
             <h5 style={{ color: "rgb(31, 55, 82)" ,fontSize:"18px"}}>Total Cost={total}$</h5>
             
             <button className="">
              CheckOut
             </button>
            </div>
          </div>
        </form>
      </div>

        </div>
      </div>

  );
};

export default Profile;
