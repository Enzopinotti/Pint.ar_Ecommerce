import CartWidget from "./CartWidget/CartWidget"
import Categorias from "./Categorias/Categorias"
import BarraBusqueda from "./BarraBusqueda/BarraBusqueda"


const NavBar = () =>{
    return (

        <nav className="navBar">
            
            <div className="NavBar_Contenedor">
                
                
                <BarraBusqueda/>
                
                
                <Categorias/>
                

                

            </div>

            <CartWidget/>
        </nav>
        
    )
}

export default NavBar