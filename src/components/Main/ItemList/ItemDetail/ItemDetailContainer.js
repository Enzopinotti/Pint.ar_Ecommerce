import {useState, useEffect} from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ItemDetailContainer = () => {
  
    const [Producto, SetProducto] = useState(null)

    const navigate = useNavigate();

    const {itemId} = useParams()

    const GetElementById =(IdBuscado)=>{

      setTimeout(() => {
        fetch('/json/productos.json')
        .then(res => res.json())
        .then(datos =>{ 
          
          SetProducto(datos.find(producto => producto.id === IdBuscado))

        })
      },  500)

    }

    const volverAtras = ()=> {
      navigate(-1); 
    }

    useEffect(() => {

      
      GetElementById(itemId)
      
      
    }, [itemId])
      
    
    return (

      <ItemDetail navigate={volverAtras} {...Producto}/>
    )

  }
  
export default ItemDetailContainer