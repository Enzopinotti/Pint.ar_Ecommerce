import { useContext } from "react"
import {Context} from "../../../Providers/CustomProvider"
import { Link } from "react-router-dom"

const CartWidget = () =>{

    const {cantidadCarrito} = useContext(Context)

    
    
    return (
        
        <Link to={"/carrito"} className="Link">
            <div className="CartWidget">
                <img src="/assets/carrito-de-compras.png" width={"50px"} />
                <h5 className="notificacion"> {cantidadCarrito} </h5>
            </div>
        </Link>
        
    )
}

export default CartWidget