import { createContext, useState } from "react";
export const Context = createContext();
const { Provider } = Context;


const CustomProvider = ({children}) => {

  
    const [cantidadCarrito,  SetCantidadCarrito] = useState(0)
    const [productoCarrito, SetProductoCarrito] = useState([])

    

    const  agregarAlCarrito = (cantidad, producto) => {
      
      if(productoCarrito.some(prod => prod.id === producto.id)) return
      if(cantidad === 0) return
      
      
      console.log(producto)
      SetCantidadCarrito(cantidadCarrito + cantidad)
      SetProductoCarrito([...productoCarrito, producto])
      
    }

    const eliminarDelCarrito = (cantidad, producto) => {
      SetCantidadCarrito(cantidadCarrito - cantidad)
      
    }

    const limpiarElCarrito = () => {
      SetCantidadCarrito(0)
      SetProductoCarrito([])
    }

    const RemoverItem = (itemId) => {
      const  newCart = productoCarrito.filter(item => item.id !== itemId)
      SetCantidadCarrito(newCart)
    
    }

    const valorDelContexto = {
      eliminarDelCarrito,
      agregarAlCarrito,  
      cantidadCarrito,
      productoCarrito,
      limpiarElCarrito,
      RemoverItem,

    }


  return (

    <Provider value={valorDelContexto}>
      {children}
    </Provider>

  )
}

export default CustomProvider;

