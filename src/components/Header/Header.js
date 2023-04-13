import NavBar from "./NavBar/NavBar"
const Header = ()=>{
    return(
        <header className="header" >
            
            <div className="header_marca">

                <img src="/assets/pintureria-logo.png" width={"90px"}/  >

                <h1 className="header_titulo" >Pint.Ar
                </h1>

            </div>
            

            <NavBar/>
            
        </header>
    )
}

export default Header