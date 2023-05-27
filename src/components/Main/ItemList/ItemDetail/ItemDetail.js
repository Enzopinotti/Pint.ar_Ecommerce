import { useContext, useState} from 'react';
import ItemCount from './ItemCount/ItemCount';
import {Context} from './../../../Providers/CustomProvider';
import  'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';




const ItemDetail = ({navigate, img, nombre, precio, categoriaPrim, stock, descripcion, producto}) => {


    function currencyFormatter({ currency, value}) {

      const precioFormato = new Intl.NumberFormat("es-AR", {
          style: 'currency',
          minimumFractionDigits: 2,
          currency
      }) 

      return precioFormato.format(value)
    } 

    const precioFinal = currencyFormatter({currency: "ARS", value:precio})

    const [cantidadSumada, setCantidadSumada] = useState(0);
    
    const {agregarAlCarrito} = useContext(Context);

    const handleClickNavigate = () => {
      navigate();
    }

    const Carrito = (cantidad) => {

      setCantidadSumada(cantidad);
      producto.cantidad = cantidad;
      agregarAlCarrito(cantidad, producto)

    }
    
    if(nombre === undefined){
      
      return (
    
        <article className="ItemDetail">
          
          <br/>
          
          <input onClick={handleClickNavigate} type='image' src='/assets/flechaAtras.png'  className='botonVolver'></input>
  
          
          <h2>Detalle del producto</h2>
          <br/>

          <div className='ItemDetail-ItemCargando'>

            <section className='TituloImagen'>
              
              <br/>
  
              <Skeleton count={1} height={"1.6rem"} width={"10rem"}/>
  
              <br/>
  
              
              < Skeleton width={"300px"} height={"300px"} /> 
  
              
  
            </section>

            <br/>
            <br/>
            <br/>
            <br/>

  
            <section  className='informacionCargando'>
              <div>

                <div style={{width: "25rem", display: "flex", justifyContent: "start"}}>< Skeleton width={"10rem"} height={"1rem"}/></div>
    
                <br/>

                <div style={{width: "30rem", display: "flex", justifyContent: "start"}}>< Skeleton width={"8rem"} height={"1rem"}/></div>

                <br/>

                <div style={{width: "30rem", display: "flex", justifyContent: "start"}}>< Skeleton width={"20rem"} height={"1rem"}/></div>

                <br/>

                <div style={{width: "37.8rem", display: "flex", justifyContent: "start"}}>< Skeleton width={"34rem"} height={"1rem"}/></div>

              </div>

              
              
            </section>
          
          
          </div>
          <br/>
          <br/>
          <br/>
          <ItemCount stock={stock} onAdd={Carrito} initial={1} />
        </article>

      )
    }
    else{

      return (

    

        <article className="ItemDetail">
          
          <br/>
          
          <input onClick={handleClickNavigate} type='image' src='/assets/flechaAtras.png'  className='botonVolver'></input>
  
          
          <h2>Detalle del producto</h2>
          <br/>
          <div className='ItemDetail-Item'>
  
  
            <section className='TituloImagen'>
              <br/>
  
              <h2 className='TituloDetail'>{nombre}</h2>
  
              <br/>
  
              
  
              <img src={img} width={"300px"} height={"300px"} alt={nombre}/>
  
              
  
            </section>
  
            <br/>
  
            <section className='informacion'>
  
              <p className='info'><strong>Categoria: </strong>{categoriaPrim}</p>
  
              <br/>
  
              <p className='info'><strong>Precio: </strong>{precioFinal}</p>
  
              <br/>
  
              <p className='info'><strong>Stock: </strong> {stock} {stock === 1 ? "Unidades" : "Unidades"}</p>
  
              <br/>
  
              <p className='info'><strong>Descripcion:</strong> {descripcion}</p>
  
            </section>
  
          </div>
          
          <br/>
          <br/>
          <br/>
          {
            cantidadSumada > 0 ? (
              <div>

                <Link to={"/carrito"} className='Link' > <button className='BotonIrAlCarrito' > Ir Al Carrito </button> </Link>
              
                <Link to={"/"} className='Link' > <button className='BotonIrAlCarrito' > Seguir Comprando </button> </Link>

              </div>
              
            ):(
              <ItemCount stock={stock} onAdd={Carrito} initial={1} />
            )

          }
          

          </article>
        
      )

    }
    



    
    

  }
  
export default ItemDetail