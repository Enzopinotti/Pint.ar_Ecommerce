import {useState, useEffect} from 'react';
import ItemCount from './ItemCount/ItemCount';





const ItemDetail = (props) => {
  
    console.log(props);
    
    return (

      <article className="ItemDetail">
        
        <br/>
       
        <input onClick={props.navigate} type='image' src='/assets/flechaAtras.png'  className='botonVolver'></input>

        
        <h2>Detalle del producto</h2>
        <br/>
        <div className='ItemDetail-Item'>


            <section className='TituloImagen'>

              <h3 className='TituloDetail'>{props.nombre}</h3>

              <br/>

              <imagen>

                <img src={props.img} width={"200px"} height={"200px"} alt={props.name}/>

              </imagen>

            </section>

            <br/>

            <section className='informacion'>

              <p className='info'><strong>Categoria: </strong>{props.categoriaPrim}</p>

              <br/>

              <p className='info'><strong>Precio: </strong>{props.precio}</p>

              <br/>

              <p className='info'><strong>Stock: </strong> {props.stock}</p>

              <br/>

              <p className='info'><strong>Descripcion:</strong> {props.descripcion}</p>

            </section>

        </div>
        
        <br/>
        <br/>
        <br/>
        <ItemCount stock={props.stock} onAdd={(cantidad)=>{console.log(cantidad)}} initial={1} />

        </article>
      
    )

  }
  
export default ItemDetail