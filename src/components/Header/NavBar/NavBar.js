import CartWidget from "./CartWidget/CartWidget"
const NavBar = () =>{
    return (

        <nav className="navBar">
            
            <div className="NavBar_BarraBusqueda">
                <img src="/assets/lupa.png" width={"20px"} />
                <form action="#" autocomplete="off" aria-label="Search form 1">
                     <input type="search" class="orig" placeholder="Buscar Producto.." name="phrase" value="" aria-label="Search input 1" autocomplete="off"/>
                    

                    <input type="submit"/>
                    

                </form>
               
            </div>
            <div className="NavBar_Categorias">
                <button>Celulares</button>
                <button>Notebooks</button>
                <button>TVs</button>
            </div>
            <CartWidget/>
        </nav>
        
    )
}

export default NavBar