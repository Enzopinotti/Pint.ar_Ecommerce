import React from 'react'
import { useState } from 'react'
import 'animate.css';

const ItemCount = (props) => {

    const [cantidad, setCantidad] = useState(props.initial)

    
    const handleAgregar = (e) => {
        if(cantidad < props.stock){
            setCantidad(cantidad + 1)
        }
        
    }
    
    const handleQuitar = (e) => {

        if(cantidad > 0){

            setCantidad(cantidad - 1)
        }
        
    }
        
    
    return (

        <div className='contenedor-item-count'>

            

            <div className='controles'>

                <button className='boton-quitar' onClick={handleQuitar}> - </button>

                <h3 className='cantidad'>{cantidad}</h3>
                
                <button className='boton-agregar' onClick={handleAgregar}> + </button>

            </div>
                
            <button className='boton-agregar-carrito' onClick={() => props.onAdd(cantidad)} disabled={!props.stock}>Agregar al carrito</button>

        </div>
    )
}

export default ItemCount
