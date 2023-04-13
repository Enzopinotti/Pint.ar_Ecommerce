import Producto from "./Producto/Producto"

const ItemList = (props) => {

    console.log(props)
    return (

      <div className="ItemList">

        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>
        <Producto id_Producto={props.id_Producto}/>

      </div>

    )
  }
  
export default ItemList