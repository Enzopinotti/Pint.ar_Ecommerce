import {NavLink} from "react-router-dom"

const SubCategoriasHerramientas = () =>{
   
   
    return (

        <div className="NavBar_SubCategorias">
            <NavLink to="/category/Herramienta/Pinceles"><button className="btnSub">Pinceles</button></NavLink>
            <NavLink to="/category/Herramienta/Rodillos"><button className="btnSub">Rodillos</button></NavLink>
            <NavLink to="/category/Herramienta/Otro"><button className="btnSub">Otros</button></NavLink>
            
        </div>
        
    )
}

export default SubCategoriasHerramientas