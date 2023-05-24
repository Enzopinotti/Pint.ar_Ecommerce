import React from 'react'
import { useContext } from 'react'
import { Context } from '../../../../Providers/CustomProvider'
import ItemBreif from './ItemBreif/ItemBreif'
const Brief = () => {


    const { infoVenta } = useContext(Context)


    console.log(infoVenta)

    if(infoVenta.length === 0){
            return(
                <div className='Brief'>No hay nada que mostrar</div>
            )
    }else{

        const {carrito, total, CantidadVenta, user, id} = infoVenta
        const {nombre} = user
        console.log(carrito)

        return (

            
        
            <div className='Brief'>
                <section className='BriefInfo'>
                    <h2 className='BriefTitle'>Gracias por tu confianza {nombre}. La orden fue realizada con éxito, para gestionar tu pago, use esta id: "{id}"</h2>
                    <p className='BriefText'>En unos minutos, te llegará un e-mail al correo suministrado con la información de su orden para proceder con el pago.</p>
                </section>
    
                <section className='ResumenBrief'>
                    <h3>Resumen de la compra</h3>
                    <br/>
                    <br/>
                    {carrito.map(producto => <ItemBreif key={producto.id}  {...producto}/>)}
                    <br/>
                    <br/>
                    <div className='BriefTotal'>
                        <h3>Total a pagar: {total}</h3>
                        <h3>Cantidad de productos: {CantidadVenta}</h3> 
                    </div>
                </section>
            </div>
        )
    }

    
}

export default Brief