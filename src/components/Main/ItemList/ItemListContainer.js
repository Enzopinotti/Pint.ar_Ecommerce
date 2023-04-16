import {useState} from 'react';
import ItemList from './ItemList';

const ItemListContainer = () => {
  
  const [Id_Producto, SetId_Producto] = useState("Nombre del Producto")
    
    return (
     <ItemList id_Producto={Id_Producto} / >
    )
  }
  
export default ItemListContainer