

import { createContext, useState } from "react";

export const Context = createContext();

const { Provider } = Context;




const CustomProvider = ({children}) => {

    const [cantidadCarrito,  SetCantidadCarrito] = useState(0)

    

    const  agregarAlCarrito = (cantidad) => {

      SetCantidadCarrito(cantidadCarrito + cantidad)
      console.log(cantidadCarrito)
    }

    const valorDelContexto = {
        nombre: "Juan",
        cantidadCarrito,
        agregarAlCarrito,
        apellido: "Perez",
        edad: 30,
        direccion: {
            calle: "Calle 1",
            numero: 123

        }
        
    }

  return (

    <Provider value={valorDelContexto}>
      {children}
    </Provider>

  )
}

export default CustomProvider;

