import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Cart = ({navigate, productos, eliminarDelCarrito, BorrarCarrito}) => {


    function currencyFormatter({ currency, value}) {

        const precioFormato = new Intl.NumberFormat("es-AR", {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 

        return precioFormato.format(value)
    } 

    const TotalPrecio = () => {
        let total = 0
        productos.map(producto => {
            total += producto.precio * producto.cantidad
        })
        return total
    }

    const [Total, setTotal] = useState(TotalPrecio())
    const TotalFinal = currencyFormatter({currency: "ARS", value:Total})
    console.log(productos)
    

    const handleRemoverItem = (id, cantidad) => {

        eliminarDelCarrito(id, cantidad)

    }

    
    const handleClickNavigate = () => {
        navigate();
    }

    const handleBorrarCarrito = () => {
        BorrarCarrito(productos)
    }
        
    function sumarSubtotales(cantidadNueva, id){
        
        productos.map(producto => {
            if(producto.id === id){
                producto.cantidad = cantidadNueva
            }
        })
        
       


    }

    useEffect(() => {

        setTotal(TotalPrecio())

    },[productos])

   
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
                                <div className='CartNoProductos'>
                                    <h3 className='TituloNoProductos'>No hay productos en el carrito</h3>
                                    <img src='/assets/carritoVacio.png' alt='carritoVacio' className='carritoVacio'></img>
                                </div>
                            ):(
                                productos.map(producto => <ItemCart key={producto.id}  {...producto} handleRemoverItem={handleRemoverItem} producto={producto}/>)
                            )

                        }  
                    </div>
                    <div className='CartBotonLimpiar'>
                        
                    {
                        
                    
                        productos.length === 0 ? (
                                <></>
                                
                            ):(
                                <button onClick={handleBorrarCarrito} className='botonLimpiarCarrito'>Limpiar El Carrito</button>
                            )
                    }
                        
                    </div>

                </section>

                <section className='CartResumen'>

                    <h3>Resumen de compra</h3>
                    
                    <br/>
                    
                    <div className='CartPrecioTotal'>
                        <h4>Total</h4>
                        <h4>{TotalFinal}</h4>
                    </div>
                    
                    <br/>
                    {
                        productos.length === 0 ? (
                            <></>
                        ):(
                            
                            <Link to={'/checkout'}style={{textDecoration: 'none' , color: 'black' , width: '100%'}} ><button className='botonClasico'>Comprar</button> </Link>
                            
                        )

                    } 
                    

                    <Link style={{textDecoration: 'none' , color: 'black' , width: '100%'}} to={'/'}><button className='botonClasico'>Seguir comprando</button></Link>


                </section>

            </div>
    

        </article>

    )

}

export default Cart