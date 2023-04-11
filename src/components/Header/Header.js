import NavBar from "./NavBar/NavBar"
const Header = ()=>{
    return(
        <header className="header" >
            <div className="header_marca">
            <img src="/assets/pintureria-logo.png" width={"60px"}/  >
            <h3 className="header_titulo" >Pinturas Pinotti</h3>
            </div>
            

            <NavBar/>
            
        </header>
    )
}

export default Header