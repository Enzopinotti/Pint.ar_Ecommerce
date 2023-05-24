import React from 'react'

const ItemBreif = ({cantidad, img, nombre, precio}) => {


    return (

         <article className='itemBreif'>
            
            <section className='itemBreifInfo'>
                <img src={img} width={"100px"} alt='producto'/>
                <h4 className='itemBreifInfoNombre'>{nombre}</h4>
            </section>
            
            <section className='itemBreifInfo'>
                <h4>Valor Unitario: {precio}</h4>
            </section>

            <section className='itemBreifInfo'>
                <h4>Cantidad: {cantidad}</h4>
            </section>

            <section className='itemBreifInfo'>
                <h4> SubTotal: {precio*cantidad}</h4>
            </section>
           
        </article>
    )
}

export default ItemBreif