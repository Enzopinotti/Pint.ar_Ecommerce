import { Link } from "react-router-dom"

const Item = (props) => {

    
    
    return (


        <div className="Producto">


            <h3 className="nombreProducto">{props.nombre}</h3>
            <br/>
            <img className="imagenProducto" src={props.img} width={"200px"} height={"200px"}/>
            <p  className="PrecioProducto">${props.precio}.00</p>
            <br/>
            <p className="DescripcionProducto">{props.descripcion}</p>

            <Link to={"/item/"+props.id} className="Link"><button className="BotonProducto">Ver Detalle</button></Link>


            
            
        </div>
      
    )
  }
  
export default Item