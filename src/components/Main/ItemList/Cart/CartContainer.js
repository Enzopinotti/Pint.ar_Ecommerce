import React from 'react'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom';
import {Context} from './../../../Providers/CustomProvider';
import {useContext, useEffect, useState} from 'react';

const CartContainer = () => {

    const {cantidadCarrito, productoCarrito, LimpiarElCarrito, RemoverItem} = useContext(Context);
    
    
    
    const [Productos, SetProductos] = useState([])
    
    const navigate = useNavigate();

    const eliminarDelCarrito = (id, cantidad) => {

        SetProductos(RemoverItem(id, cantidad))

    }

    const BorrarCarrito = (productos) => {

        SetProductos(LimpiarElCarrito(productos))
    }
    
    

    const volverAtras = ()=> {

        navigate(-1); 

    }


    

    useEffect(() => {

        
        
        if(productoCarrito != null && cantidadCarrito != null){
            
            SetProductos(productoCarrito)
            

        }
        

      }, [productoCarrito])

    return ( 

        

        <Cart navigate={volverAtras} productos={Productos} eliminarDelCarrito={eliminarDelCarrito} BorrarCarrito={BorrarCarrito} />

       

    )

}

export default CartContainer