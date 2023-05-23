import React from 'react'
import Checkout from './Checkout'
import { useNavigate } from 'react-router-dom';


const CheckoutContainer = () => {

    const navigate = useNavigate();
    console.log(navigate)
    const volverAtras = ()=> {

        navigate(-1); 

    }


  return (
    
    
    <Checkout navigate={volverAtras}/>

  )
}

export default CheckoutContainer