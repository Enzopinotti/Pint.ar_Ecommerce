import React from 'react'
import { useState, useContext } from 'react'
import 'animate.css';



const ItemCountCart = ({initial, stock, onAdd, onRemove, id}) => {



    const [cantidad, setCantidad] = useState(initial)

    
    const handleAgregar = () => {
        if(cantidad < stock){

            setCantidad(cantidad + 1)
            
            onAdd(id, cantidad + 1)
            
        }
        
    }
    
    const handleQuitar = () => {

        if(cantidad > 1){

            setCantidad(cantidad - 1)
            console.log(cantidad)
            onRemove(id, cantidad - 1)
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
