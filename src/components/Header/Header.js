import NavBar from "./NavBar/NavBar"
import { Link } from "react-router-dom"

const Header = ()=>{
    return(
        <header className="header" >
        <Link to="/" className="Link_marca">
            <div className="header_marca">
                <h1 className="header_titulo" >Pint.ar</h1>
            </div>
        </Link>

        <NavBar/>
            
        
        </header>
    )
}

export default Header