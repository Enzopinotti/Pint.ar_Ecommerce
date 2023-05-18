import {useState, useEffect, useContext} from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProducts } from '../../../../utils';


const ItemDetailContainer = () => {
  
    const [Producto, SetProducto] = useState({})

    const navigate = useNavigate();

    const {itemId} = useParams()
    
    const volverAtras = ()=> {
      navigate(-1); 
    }

    const GetElementById =(IdBuscado)=>{

     
      setTimeout(() => {

        
        const res = getProducts()
          .then(datos =>{ 
            
            toast.dismiss()
            toast.success("Producto cargado correctamente" , {
              position: "bottom-left",
              autoClose: 1000,
              theme: "dark",
            })
            SetProducto(datos.find(producto => producto.id === IdBuscado))

          })
          .catch(error => toast.error("Error al cargar el detalle del producto" , {
            position: "bottom-left",
            autoClose: 1000,
            theme: "dark",
          }))

      },  2000)

    }

    

    useEffect(() => {

      toast.info("Cargando el detalle del producto..." , {
          position: "bottom-left",
          autoClose: 1700,
        } )
      GetElementById(itemId)
      
      
    }, [itemId])
      
    
    return (

      <ItemDetail navigate={volverAtras} {...Producto} producto={Producto} />
    )

  }
  
export default ItemDetailContainer