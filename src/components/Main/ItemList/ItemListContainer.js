import {useState, useEffect} from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import { getProducts , getProductForCategory} from '../../../utils';

const ItemListContainer = ({Subcategoria}) => {
  
    const [Producto, SetProducto] = useState([])

    const {categoryId} = useParams();

    

    const GetElementByCategory = (CategoryBuscado) => {

      setTimeout(() => {
        
        const res = getProductForCategory(CategoryBuscado, Subcategoria)
        .then((datos)=>{

          SetProducto(datos)

        })
        
      },  500)

    }

    useEffect(() => {

      if(categoryId == undefined){
        setTimeout(() => {
          const res = getProducts()
          .then((datos)=>{
            
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