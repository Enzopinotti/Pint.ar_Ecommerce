import React from 'react'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom';
import {Context} from './../../../Providers/CustomProvider';
import {useContext, useEffect, useState} from 'react';

const CartContainer = () => {

    const {cantidadCarrito, productoCarrito} = useContext(Context);

    console.log(productoCarrito)
    console.log(cantidadCarrito)
    
    const [Productos, SetProductos] = useState([])
    const navigate = useNavigate();

    
    console.log(Productos)

    const volverAtras = ()=> {

        navigate(-1); 

    }


    

    useEffect(() => {

        
        
        if(productoCarrito != null && cantidadCarrito != null){
            
            SetProductos(productoCarrito)
            

        }
        

      }, [])

    return ( 

        

        <Cart navigate={volverAtras} productos={Productos} />

       

    )

}

export default CartContainer
