import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../../Providers/CustomProvider'
import { Link } from 'react-router-dom'

const Cart = ({navigate, productos}) => {

    const {limpiarElCarrito, RemoverItem} = useContext(Context);

    let totalInicial = 0;

    productos.map(producto => {
        
        totalInicial = totalInicial + (producto.precio * producto.cantidad)
        console.log(totalInicial)
    })

    const [PrecioTotal, setPrecioTotal] = useState(totalInicial)

    console.log(productos)

    console.log(PrecioTotal)

    
    const handleClickNavigate = () => {
        navigate();
    }

    
        
    function sumarSubtotales(cantidadNueva, id){
        
        productos.map(producto => {
            if(producto.id === id){
                producto.cantidad = cantidadNueva
            }
        })
        
       


    }
   
    return ( 

        <article className="ContenedorCart">

            <br/>
            <div className='CartTitulo'>
                <input onClick={handleClickNavigate} type='image' src='/assets/flechaAtras.png'  className='botonVolver'></input>
                <h2>Mi Carrito</h2>
            </div>

            <div className='Cart'>

                <section className='CartProductos'>
                    <div className='CartTitulos'>
                        <h3>Producto</h3>
                        <h3>Precio</h3>
                        <h3>Cantidad</h3>
                        <h3>SubTotal</h3>
                    </div>
                    <div className='CartProductosContenido'>
                    {
                        productos.length === 0 ? (
                            <div>No hay productos en el carrito</div>
                        ):(
                            productos.map(producto => <ItemCart key={producto.id}  {...producto} sumarSubtotales={sumarSubtotales} />)
                        )

                    }
                    
                        
                    </div>

                </section>

                <section className='CartResumen'>

                    <h3>Resumen de compra</h3>
                    
                    <br/>
                    
                    <div className='CartPrecioTotal'>
                        <h4>Total</h4>
                        <h4>{PrecioTotal}</h4>
                    </div>
                    
                    <br/>
                        
                    <button className='botonClasico'>Comprar</button>

                    <Link style={{textDecoration: 'none' , color: 'black' , width: '100%'}} to={'/'}><button className='botonClasico'>Seguir comprando</button></Link>
                </section>

            </div>
    

        </article>

    )

}

export default Cart