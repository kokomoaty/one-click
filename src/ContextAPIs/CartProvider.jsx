import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { UsersContext } from "./UsersContext";
export default function CartProvider(props){
    const [CartData,setCartData]=useState([]);
    const {CurrentUser,handleUser}=useContext(UsersContext);
    // useEffect(()=>{
    //     if(CurrentUser!=null)
    //        {
    //             let data=CurrentUser?.cart;
    //             setCartData(
    //                 data
    //             );
    //             console.log(data)
    //         }else{
    //             let data=localStorage.getItem('cart');
    //             setCartData(data?JSON.parse(data):[])
    //         }
    // },[]);
    const AddToCart=(id)=>{
        const item=isExsist(id);
        if(item){
            item.qty++;
            setCartData(
                CartData.map((e)=>e.id===item.id?item:e)
            )
        }else{
            setCartData(
                [
                    ...CartData,
                    {
                        id:id,
                        qty:1
                    }
                ]
            )
        }
    }
    const isExsist=(id)=>{
        const item=CartData.find((e)=>e.id===id);
        return (item?item:false);
    }
    useEffect(
        ()=>{
            localStorage.setItem('cart',JSON.stringify(CartData));
            if(CurrentUser){
                handleUser({
                    ...CurrentUser,
                    cart:CartData
                });
                axios.put(`http://localhost:5000/User/${CurrentUser?.id}`,CurrentUser);
            }
        },[CartData]);
    let values={
        CartData,AddToCart,setCartData
    }
    return(
        <CartContext.Provider value={values}>
            {props.children}
        </CartContext.Provider>
    )
}