
const BarraBusqueda = () =>{

    return (

        <div className="NavBar_BarraBusqueda">
        
            <form action="#" autocomplete="off" aria-label="Search form 1" className="Formulario_Busqueda">


                <input type="search" class="orig" placeholder="Buscar Producto.." name="phrase" value="" aria-label="Search input 1" autocomplete="off" className="Input_Busqueda" />


                <input type="image" src="/assets/lupa.png" width="20px" className="Submit_Lupa"/>


            </form>

        </div>
        
    )
}

export default BarraBusqueda