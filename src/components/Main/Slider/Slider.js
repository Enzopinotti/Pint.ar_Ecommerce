import React from 'react'
import { useEffect, useState } from 'react'

const Slider = () => {


    const [Imagenes ,  SetImagenes] = useState ([])
    const [ImagenActual, SetImagenActual] = useState (0)
    const [indexActual, SetIndexActual] = useState (0)
    const [Loaded,  SetLoaded] = useState (false)


    const imagenSeleccionada = (index, imagenes, next=true) => {


        SetLoaded(false)
        const condicion = next ? index < imagenes.length - 1 : index > 0
        const nextIndex = next ? (condicion ?  indexActual + 1 : 0): condicion ?   index - 1 : imagenes.length - 1
        SetImagenActual(nextIndex)
        SetIndexActual(nextIndex)

    }
    

    useEffect(() => {

            setTimeout(() => {
                fetch('/json/imagenesSlider.json')
                .then(res => res.json())
                .then(datos =>{ 

                    SetImagenes(datos)
                    console.log(datos)
                })
            },  700)




    },[])

    
    useEffect(() => {

        const intervalo = setInterval(() => {

            imagenSeleccionada(indexActual, Imagenes)
        
            

        }, 3500)
        
        return () => clearInterval(intervalo)
    })

    
    if(Imagenes.length === 0||Array.isArray(Imagenes)===false){

        return (
            <div>
                <h1 style={{padding:'1rem', textAlign:'center', width:'fit-content' , margin:'auto' , marginTop:'5rem' , marginBottom:'5rem' , fontSize:'2rem'}} className='animate__animated animate__pulse animate__infinite'>Cargando...</h1>
            </div>
        )


    }else{

        return (

    
            <div className='sliderContainer'>
        
                <h3 style={{padding:'1rem'}}>Los Productos de mejor calidad</h3>

                {Imagenes.map((imagen , index) => {
                    
                        return(
                    
                            <div>

                                {ImagenActual === index && (<img className={Loaded ? 'sliderImagen loaded' : 'sliderImagen'} src={imagen.img} key={index} alt="Imagen Slider" onLoad={() => {SetLoaded(true)}} /> )}
                                

                            </div>
                        
                        )
                    })
                }
        
            </div>
        
        )

    }
    
  
    
}

export default Slider