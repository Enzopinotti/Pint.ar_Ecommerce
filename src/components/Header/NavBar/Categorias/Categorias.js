import {NavLink} from "react-router-dom"
import SubCategoriasPinturas from "./SubCategoriasPinturas/SubCategoriasPinturas"
import SubCategoriasHerramientas from "./SubCategoriasHerramientas/SubCategoriasHerramientas"

const Categorias = () =>{
    return (

        <ul className="NavBar_Categorias">

            <div className="categoriaPintura">

                <NavLink to="/category/Pintura" className="Link">
                    <button className="btn">Pinturas</button>
                </NavLink>

                <SubCategoriasPinturas/>
            </div>
            
            <div className="categoriaHerramienta">

                <NavLink to="/category/Herramienta" className="Link">
                    <button className="btn">Herramientas</button>
                </NavLink>
                
                <SubCategoriasHerramientas/>
            </div>
            

            <NavLink to="/SobreNosotros" className="Link"><button className="btn">Sobre Nosotros</button></NavLink>

        </ul>
        
    )
}

export default Categorias