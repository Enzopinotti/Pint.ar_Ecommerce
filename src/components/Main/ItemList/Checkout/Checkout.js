import React from 'react'

const Checkout = ({navigate}) => {


    const handleClickNavigate = () => {
        navigate();
    }



  return (
    <div className='checkout'>
        
        <form action="" className="checkoutForm">
            <input onClick={handleClickNavigate} type='image' src='/assets/flechaAtras.png'  className='botonVolver'></input>
            <h2 className='checkoutTitulo'>Por favor, ingrese sus datos para finalizar su compra</h2>
            <div >
                <label htmlFor="nombre">Nombre/s</label>
                <input type="text" placeholder='Juan Pedro' className='checkoutInput' id='nombre'/>
            </div>
            <div>
                <label htmlFor="apellido">Apellido/s</label>
                <input type="text" placeholder='Rodriguez' className='checkoutInput' id='apellido'/>
            </div>
            <div>
                <label htmlFor="telefono">Teléfono</label>
                <input type="text" placeholder='Teléfono' className='checkoutInput' id='telefono'/>
            </div>
            <div>
                <label htmlFor="correo">Correo electrónico</label>
                <input type="text" placeholder='Correo electrónico' className='checkoutInput' id='correo'/>
            </div>
            
        </form>

    
    </div>
  )
}

export default Checkout