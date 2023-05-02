import NavBar from "./NavBar/NavBar"
import { Link } from "react-router-dom"

const Header = ()=>{
    return(
        <header className="header" >
            
            <Link to="/" className="Link">
            <div className="header_marca">

                <img src="/assets/pintureria-logo.png" width={"90px"}/  >

                <h1 className="header_titulo" >Pint.Ar
                </h1>

            </div>
            </Link>
            

            <NavBar/>
            
        </header>
    )
}

export default Header