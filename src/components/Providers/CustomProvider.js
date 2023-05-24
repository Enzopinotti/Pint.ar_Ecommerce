import { createContext, useState } from "react";
export const Context = createContext();
const { Provider } = Context;


const CustomProvider = ({children}) => {

  
  const [cantidadCarrito,  SetCantidadCarrito] = useState(0)
  const [productoCarrito, SetProductoCarrito] = useState([])
  const [totalVenta, SetTotalVenta] = useState(0)
  const [infoVenta, SetInfoVenta] = useState([])
  
  
  

  const  agregarAlCarrito = (cantidad, producto) => {
    
    if(productoCarrito.some(prod => prod.id === producto.id)) return
    if(cantidad === 0) return
    SetCantidadCarrito(cantidadCarrito + cantidad)
    SetProductoCarrito([...productoCarrito, producto])
    
  }

  const LimpiarElCarrito = () => {
    SetCantidadCarrito(0)
    SetProductoCarrito([])
    return productoCarrito
  }

  const RemoverItem = (id, cantidad) => {
    
    const  newCart = productoCarrito.filter(item => item.id !== id)
    SetCantidadCarrito(cantidadCarrito - cantidad)
    SetProductoCarrito(newCart)
    return productoCarrito
  
  }

  const ModificarCantidad = (id, cantidad) => {

    let aumento = false

    const newCart = productoCarrito.map(item => {
      if(item.id === id){
        if(item.cantidad<cantidad){
          aumento = true
        }
        item.cantidad = cantidad
      }
      return item
    })
    SetProductoCarrito(newCart)

    if(aumento){
      SetCantidadCarrito(cantidadCarrito + 1)
    }else{
      SetCantidadCarrito(cantidadCarrito - 1)
    }
    
  }

  const GuardarTotalVenta = (Total) => {

    SetTotalVenta(Total)
    
  }
    
  const GuardarInfoVenta = (info) => {

    SetInfoVenta(info)

  }

  const valorDelContexto = {
    agregarAlCarrito,  
    LimpiarElCarrito,
    RemoverItem,
    ModificarCantidad,
    GuardarTotalVenta,
    GuardarInfoVenta,

    cantidadCarrito,
    productoCarrito,
    totalVenta,
    infoVenta,

  }


  return (

    <Provider value={valorDelContexto}>
      {children}
    </Provider>

  )
}

export default CustomProvider;

