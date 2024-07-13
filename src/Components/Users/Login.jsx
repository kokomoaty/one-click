import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UsersContext } from "../../ContextAPIs/UsersContext";
export default function Login(){
  const {handleUser}=useContext(UsersContext);
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const usenavigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      fetch("http://localhost:5000/User/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          //console.log(resp)
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("user", JSON.stringify(resp));
              console.log(resp)
              handleUser(resp);
              usenavigate("/Home");
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <div className="row m-auto py-5">

        <form onSubmit={ProceedLogin} className="col-lg-3 col-9 m-auto">
          <div>
            <h1 className="text-success"> Log in</h1>

            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg text-danger">*</span>
                </label>
                <ToastContainer />
                <input
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg text-danger">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer m-2">
              <button type="submit" className="btn btn-success">
                Login
              </button>
              <Link
                className="btn btn-secondary text-white ms-2"
                to={"/Signin"}
              >
                SignUp
              </Link>
            </div>
          </div>
        </form>
      </div>
  );
};

