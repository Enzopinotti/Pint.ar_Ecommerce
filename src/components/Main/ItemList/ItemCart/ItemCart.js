import React from 'react'
import ItemCountCart from './ItemCountCart/ItemCountCart';
import { Context } from '../../../Providers/CustomProvider';
import { useContext, useState } from 'react';

const ItemCart = ({nombre, precio,img, cantidad, stock, id, sumarSubtotales}) => {

    
    const [SubTotal ,  setSubTotal] = useState(cantidad*precio)

    function cambiarSubtotal(cantidadNueva){

        
        setSubTotal(cantidadNueva*precio)
        sumarSubtotales(cantidadNueva, id)
    
    }

    
    
    

    return (

        <article className='itemCart'>
            <section className='itemInfo'>
                <img src={img} alt='producto'/>
                <h4 className='itemCartinfoNombre'>{nombre}</h4>
            </section>
            
            <section className='itemPrecio'>
                <h4>{precio}</h4>
            </section>
            <section className='itemCantidad'>
                <ItemCountCart key={id} initial={cantidad} stock={stock} cambiarSubtotal={cambiarSubtotal}/>
            </section>
            <section className='Subtotal'>
                <h4>{SubTotal}</h4>
            </section>
        </article>
    )
}

export default ItemCart;