import Item from "./Item/Item"
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import 'animate.css';


const ItemList = (props) => {

  const listaProductos = props.productos
  

  if(listaProductos.length == 0){
    
    return (
      
      <div className="ContenedorCargando">

        
        <h1 className="cargando animate__animated animate__pulse animate__infinite" >Cargando Items...</h1>

        

      </div>
      

    )
  }else{
    return (


      <div className="ContenedorCatalogo">

        
    
        <div className="ItemList">
          
          {listaProductos.map(producto => <Item key={producto.id} {...producto}/>)}

        </div>



      </div>

    )
  }

  
}
  
export default ItemList
