import React from 'react'
import { useState, useContext } from 'react'
import 'animate.css';

import { Context } from '../../../../Providers/CustomProvider'

const ItemCountCart = ({initial, stock, cambiarSubtotal}) => {


    
    const {} = useContext(Context);

    const [cantidad, setCantidad] = useState(initial)

    
    const handleAgregar = (e) => {
        if(cantidad < stock){

            setCantidad(cantidad + 1)
            cambiarSubtotal(cantidad + 1)
        }
        
    }
    
    const handleQuitar = (e) => {

        if(cantidad > 1){

            setCantidad(cantidad - 1)
            cambiarSubtotal(cantidad - 1)
        }
        
    }

    
        
    
    return (

        <div className='contenedor-item-count'>


            <button className='botonCart'  onClick={handleQuitar}> - </button>

            <h3>{cantidad}</h3>
            
            <button className='botonCart'  onClick={handleAgregar}> + </button>

            
             

        </div>
    )
}

export default ItemCountCart
