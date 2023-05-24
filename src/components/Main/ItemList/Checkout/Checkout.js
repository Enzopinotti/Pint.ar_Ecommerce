import React from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { Context } from '../../../Providers/CustomProvider'
import { useContext, useRef} from 'react'
import { saveOrder } from '../../../../utils'
import { Link } from 'react-router-dom'

const Checkout = () => {


    const {cantidadCarrito, productoCarrito, totalVenta, LimpiarElCarrito, GuardarInfoVenta} = useContext(Context)

    const inputNombre = useRef();
    const inputApellido = useRef();
    const inputTelefono = useRef();
    const inputCorreo = useRef();

    

    const handleComprar = (e) => {
        
        

        const venta ={

            user:{

                nombre: inputNombre.current.value,
                apellido: inputApellido.current.value,
                telefono: inputTelefono.current.value,
                correo: inputCorreo.current.value

            },
            carrito:  productoCarrito,
            total: totalVenta,
            CantidadVenta: cantidadCarrito,
            fechaDeCompra: serverTimestamp()

        }



        saveOrder(venta)
        .then((id) => {
            venta.id = id
            GuardarInfoVenta(venta)
            LimpiarElCarrito()
            inputNombre.current.value = ""
            inputApellido.current.value = ""
            inputTelefono.current.value = ""
            inputCorreo.current.value = ""
        })

        
        
    }
    
    return (
        <div className='checkout'>
            
            <form className="checkoutForm">
                
                <h2 className='checkoutTitulo'>Por favor, ingrese sus datos para finalizar su compra</h2>
                <div >
                    <label htmlFor="nombre">Nombre/s</label>
                    <input type="text" placeholder='Juan Pedro' className='checkoutInput' id='nombre' ref={inputNombre} autoFocus/>
                </div>
                <div>
                    <label htmlFor="apellido">Apellido/s</label>
                    <input type="text" placeholder='Rodriguez' className='checkoutInput' id='apellido' ref={inputApellido}/>
                </div>
                <div>
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" placeholder='Teléfono' className='checkoutInput' id='telefono' ref={inputTelefono}/>
                </div>
                <div>
                    <label htmlFor="correo">Correo electrónico</label>
                    <input type="email" placeholder='Correo electrónico' className='checkoutInput' id='correo' ref={inputCorreo}/>
                </div>
                <br/>
                <Link  to='/brief' className='checkoutLink'><button onClick={handleComprar} className='checkoutBoton'>Finalizar Compra</button></Link>
                
            </form>

        
        </div>
    )
}

export default Checkout