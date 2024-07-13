import { useContext, useEffect } from "react"
import { UsersContext } from "../../ContextAPIs/UsersContext"
import { useNavigate,Link } from "react-router-dom";

export default function UserProfile(){
    const {CurrentUser,DeleteUser,currentUserReset}=useContext(UsersContext);
    const navigate=useNavigate();
    const deleteUserhandler=()=>{
        if(window.confirm("are you sure ?")){
            DeleteUser(CurrentUser?.id);
            navigate("/shop");
        }
    }
    const UserSignOut=()=>{
        currentUserReset();
        navigate("/shop");
    }
    return(
        <div className="d-flex flex-column align-items-center gap-3">
            <img src={require("../../Images/user/icons8-user-96.png")} alt="" />
            <h1>{CurrentUser?.id}</h1>
            {
                CurrentUser?.role==='admin'?
                <button className={"btn btn-outline-warning"} onClick={()=>navigate("/EditUsers")}>EditUsers</button>
                :
                <></>
            }
            <div>
            <button className="btn btn-success mx-3" onClick={UserSignOut}>Sign Out</button>
            <button className="btn btn-danger" onClick={deleteUserhandler}>Delete User</button>
            </div>
        </div>
    )
}