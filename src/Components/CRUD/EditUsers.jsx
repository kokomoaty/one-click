import { useContext, useEffect } from "react"
import { UsersContext } from "../../ContextAPIs/UsersContext"
import { useNavigate } from "react-router-dom";
export default function EditUsers(){
    const {UsersData,DeleteUser,CurrentUser}=useContext(UsersContext);
    const navigate=useNavigate();
    
  useEffect(()=>{
    console.log(CurrentUser?.id);
        if(CurrentUser?.role!=="admin"){
      navigate("/404");
    }
  },[]);
    const deleteUserHandler=(id)=>{
      if(window.confirm(`confirm remove "${id}"`)){
        DeleteUser(id);
      }
    }
    return(
        <table class="table table-dark table-responsive caption-top container-fluid container-lg">
  <caption>List of users</caption>
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
        {
            UsersData?.map((user)=>{
                return(
                    <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="col-1"><button className="btn btn-danger"
                    onClick={()=>deleteUserHandler(user.id)}
                    >delete</button></td>
                  </tr>
                )
            })
        }
  </tbody>
</table>
    )
}