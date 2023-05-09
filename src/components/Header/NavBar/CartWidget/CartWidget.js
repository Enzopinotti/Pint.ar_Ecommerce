import { useContext } from "react"
import {Context} from "../../../Providers/CustomProvider"

const CartWidget = () =>{

    const {cantidadCarrito} = useContext(Context)

    
    
    return (
        <div className="CartWidget">
            <img src="/assets/carrito-de-compras.png" width={"45px"} />
            <h5 className="notificacion"> {cantidadCarrito} </h5>
        </div>
        
        
    )
}

export default CartWidget