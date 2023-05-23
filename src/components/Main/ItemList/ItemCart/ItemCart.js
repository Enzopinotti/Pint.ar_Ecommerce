import React from 'react'
import ItemCountCart from './ItemCountCart/ItemCountCart';
import { Context } from '../../../Providers/CustomProvider';
import { useContext, useState, useEffect } from 'react';

const ItemCart = ({nombre, precio,img, cantidad, stock, id, handleRemoverItem, producto}) => {

    function currencyFormatter({ currency, value}) {

        const precioFormato = new Intl.NumberFormat("es-AR", {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 

        return precioFormato.format(value)
    } 
    
    const precioFinal = currencyFormatter({currency: "ARS", value:precio})

    const {ModificarCantidad} = useContext(Context);

    const [SubTotal , setSubTotal] = useState(precioFinal * cantidad)

    const SubTotalFinal = currencyFormatter({currency: "ARS", value:SubTotal})

    console.log(producto)

    const removerItem = (id, cantidad) => {
        
        handleRemoverItem(id, cantidad)

    }

    
    const handleModificarCantidad = (id, cantidad) => {
        
        ModificarCantidad(id, cantidad)
        

    }
    useEffect(() => {

        setSubTotal(precio * cantidad)
        
    })

    return (

        <article className='itemCart'>
            <section className='itemInfo'>
                <img src={img} alt='producto'/>
                <h4 className='itemCartinfoNombre'>{nombre}</h4>
            </section>
            
            <section className='itemPrecio'>
                <h4>{precioFinal}</h4>
            </section>
            <section className='itemCantidad'>
                <ItemCountCart key={id} initial={cantidad} stock={stock} onAdd={handleModificarCantidad} onRemove={handleModificarCantidad} id={id}/>
            </section>
            <section className='Subtotal'>
                <h4>{SubTotalFinal}</h4>
            </section>
            <section className='eliminarItem'>
                <img onClick={() => removerItem(id, cantidad)} src='/assets/xNegra.png' width={"15rem"}></img>   
            </section>
        </article>
    )
}

export default ItemCart;