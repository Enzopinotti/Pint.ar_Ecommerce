import { Link } from "react-router-dom"


const Item = ({nombre, img, precio, id}) => {

    function currencyFormatter({ currency, value}) {

        const precioFormato = new Intl.NumberFormat("es-AR", {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        }) 

        return precioFormato.format(value)
    } 
    
    const precioFinal = currencyFormatter({currency: "ARS", value:precio})

    return (


        <div className="Producto">


            
            <div className="imagenContenedor">
                <img className="imagenProducto" src={img} alt="imagenProducto" />
            </div>
            
            <h3 className="nombreProducto">{nombre}</h3>
            <br/>
            
            <p  className="PrecioProducto">{precioFinal}</p>
            
            <br/>
            <Link to={"/item/"+id} className="LinkBotonDetalles"><button className="BotonProducto">Ver Detalle</button></Link>
            <br/>

        </div>
      
    )
  }
  
export default Item