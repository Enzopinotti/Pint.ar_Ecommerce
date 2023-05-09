import {NavLink} from "react-router-dom"
import SubCategoriasPinturas from "./SubCategoriasPinturas/SubCategoriasPinturas"
import SubCategoriasHerramientas from "./SubCategoriasHerramientas/SubCategoriasHerramientas"

const Categorias = () =>{
    return (

        <ul className="NavBar_Categorias">


            <NavLink to="/category/Pintura" className="Link">
                <button className="btn">Pinturas</button>
                <SubCategoriasPinturas/>
            </NavLink>

            <NavLink to="/category/Herramienta" className="Link"><button className="btn">Herramientas</button><SubCategoriasHerramientas/></NavLink>

            <NavLink to="/Herramientas" className="Link"><button className="btn">Sobre Nosotros</button></NavLink>

       
            

       </ul>
        
    )
}

export default Categorias