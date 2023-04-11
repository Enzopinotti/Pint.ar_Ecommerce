import {useState} from 'react';
import ItemList from './ItemList';

const ItemListContainer = () => {

    const [saludo, changeSaludo] = useState("¿Hola Como estás?")
    
    return (
     <ItemList greeting={saludo} / >
    )
  }
  
export default ItemListContainer