import {useState, useEffect} from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';

const ItemListContainer = (props) => {
  
    const [Producto, SetProducto] = useState([])

    const {categoryId} = useParams();

    

    const GetElementByCategory = (CategoryBuscado) => {

      setTimeout(() => {
        fetch('/json/productos.json')
        .then(res => res.json())
        .then(datos =>{ 
          
          if(props.Subcategoria == true){
            SetProducto(datos.filter(producto => producto.categoriaSec == CategoryBuscado))
          }else{
            SetProducto(datos.filter(producto => producto.categoriaPrim === CategoryBuscado))
          }
          
            
        })
      },  500)

    }

    useEffect(() => {

      if(categoryId == undefined){
        setTimeout(() => {
          fetch('/json/productos.json')
          .then(res => res.json())
          .then(datos =>{ 
            
            SetProducto(datos)
  
          })
        },  500)
      }else{
        GetElementByCategory(categoryId)
      }
        
      
    }, [categoryId])
      
    
    return (
      <ItemList productos={Producto}  />
    )

  }
  
export default ItemListContainer