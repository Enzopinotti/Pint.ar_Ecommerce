import React from 'react'
import { useState } from 'react'
import 'animate.css';

const ItemCount = ({initial, stock, onAdd}) => {


    
    const [cantidad, setCantidad] = useState(initial)

    
    const handleAgregar = (e) => {
        if(cantidad < stock){
            setCantidad(cantidad + 1)
        }
        
    }
    
    const handleQuitar = (e) => {

        if(cantidad > 0){

            setCantidad(cantidad - 1)
        }
        
    }

    const agregarAlCarrito = () => {
        onAdd(cantidad)
    }
        
    
    return (

        <div className='contenedor-item-count'>

            

            <div className='controles'>

                <button className='boton-quitar' onClick={handleQuitar}> - </button>

                <h3 className='cantidad'>{cantidad}</h3>
                
                <button className='boton-agregar' onClick={handleAgregar}> + </button>

            </div>
                
            <button className='boton-agregar-carrito' onClick={agregarAlCarrito} disabled={!stock}>Agregar al carrito</button>

        </div>
    )
}

export default ItemCount
