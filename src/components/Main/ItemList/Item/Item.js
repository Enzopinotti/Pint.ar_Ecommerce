import { Link } from "react-router-dom"


const Item = ({nombre, img, precio, descripcion, id}) => {

    
    
    return (


        <div className="Producto">


            <h3 className="nombreProducto">{nombre}</h3>
            <br/>
            <img className="imagenProducto" src={img} width={"200px"} height={"200px"}/>
            <p  className="PrecioProducto">${precio}.00</p>
            <br/>
            <p className="DescripcionProducto">{descripcion}</p>

            <Link to={"/item/"+id} className="Link"><button className="BotonProducto">Ver Detalle</button></Link>


            
            
        </div>
      
    )
  }
  
export default Item