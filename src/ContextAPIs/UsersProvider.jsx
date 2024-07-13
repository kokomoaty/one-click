import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UsersContext } from "./UsersContext";
import { CartContext } from "./CartContext";
function UsersProvider(props){
    const [CurrentUser,setCurrentUser]=useState(null);
    const [UsersData,setUsersData]=useState(null);
    useEffect(()=>{
        const user=sessionStorage.getItem('user');
        if(user){
            const userData=JSON.parse(user);
            setCurrentUser(userData);
        }
        axios.get("http://localhost:5000/User").then((res)=>{
            setUsersData(res.data);
        })
    },[]);
    function handleUser(user){
        setCurrentUser(user)
        console.log(CurrentUser);
    }
    const currentUserReset=()=>{
        setCurrentUser(null);
        sessionStorage.clear();
    }
    const DeleteUser=(id)=>{
        if(CurrentUser?.id===id){
            currentUserReset();
        }
        axios.delete(`http://localhost:5000/User/${id}`).then(
            ()=>{
                axios.get("http://localhost:5000/User").then((res)=>{
                    setUsersData(res.data);
                })
            }
        )

    }
    let values={
        CurrentUser,handleUser,UsersData,DeleteUser,currentUserReset
    };
    return(
        <UsersContext.Provider value={values}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersProvider;
