import {useState, useEffect, useContext} from 'react';
import ItemCount from './ItemCount/ItemCount';
import {Context} from './../../../Providers/CustomProvider';





const ItemDetail = ({navigate, img, name, precio, categoriaPrim, stock, descripcion}) => {
  
    const {agregarAlCarrito} = useContext(Context);

    const handleClickNavigate = () => {
      navigate();
    }

    const Carrito = (cantidad) => {

      agregarAlCarrito(cantidad)

    }
    
    return (

      <article className="ItemDetail">
        
        <br/>
       
        <input onClick={handleClickNavigate} type='image' src='/assets/flechaAtras.png'  className='botonVolver'></input>

        
        <h2>Detalle del producto</h2>
        <br/>
        <div className='ItemDetail-Item'>


            <section className='TituloImagen'>

              <h3 className='TituloDetail'>{name}</h3>

              <br/>

              <imagen>

                <img src={img} width={"200px"} height={"200px"} alt={name}/>

              </imagen>

            </section>

            <br/>

            <section className='informacion'>

              <p className='info'><strong>Categoria: </strong>{categoriaPrim}</p>

              <br/>

              <p className='info'><strong>Precio: </strong>{precio}</p>

              <br/>

              <p className='info'><strong>Stock: </strong> {stock}</p>

              <br/>

              <p className='info'><strong>Descripcion:</strong> {descripcion}</p>

            </section>

        </div>
        
        <br/>
        <br/>
        <br/>
        <ItemCount stock={stock} onAdd={Carrito} initial={1} />

        </article>
      
    )

  }
  
export default ItemDetail