import React from 'react'
import Slider from '../../Slider/Slider'
const SobreNosotros = () => {



  return (
    <div className='containerNosotros'>
      <section className='sectionNosotros1'>
        <article className='articleNosotros1'>

          <div className='divNosotros1'>
            
            <Slider />

          </div>
            
        </article>

        <article className='articleNosotros2'>

        <div className='divNosotros2'>

          <h3 style={{ textAlign:'center', paddingTop:'10px', paddingBottom:'10px', fontSize:'20px'}}>Pigmentos 100% Naturales</h3>

          <img src='/assets/pigmentosNaturales.jpg' alt='pigmentosNaturales' className='imgPigmentos' />

        </div>
          
        </article>

        <article className='articleNosotros3'>

        <div className='divNosotros3'>
            <h3>Comprometidos con el medio ambiente</h3>
        </div>
          
        </article>

      </section >

      <section  className='sectionNosotros2'>

        <article className='articleNosotros4'>

        <h1 className='h1Nosotros2'>Compromiso con el medio ambiente</h1>
          
        </article>

        <article className='articleNosotros5'>

          <img src='/assets/gifSobreNosotros.gif' alt='logo' className='gifNosotros'/>

        </article>

        <article className='articleNosotros6'>

          <h1 className='h1Nosotros3'>La pintura mineral es la data que necesitas</h1>

        </article>
        

      </section>

      <section  className='sectionNosotros3'>

        

      </section>

    </div>
    


  )
}

export default SobreNosotros