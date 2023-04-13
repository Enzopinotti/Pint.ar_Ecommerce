const Producto = (props) => {

    
    return (
        <div className="Producto">
            <img src="/assets/Foto_pintura1.png" width={"120px"} />
            <h3>{props.id_Producto}</h3>
        </div>
      
    )
  }
  
export default Producto