import React from 'react';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate=useNavigate();
    return (
        <div className='py-5'>
            <h1 className='fs-1 text-center text-danger my-5'>Not Found</h1>
            <button className='btn btn-secondary d-block m-auto fs-3'
            onClick={()=>navigate("/shop")}
            >Go Back</button>
        </div>
    );
};

export default NotFound;