
const BarraBusqueda = () =>{

    return (

        <div className="NavBar_BarraBusqueda">
        
            <form action="#" autoComplete="off" aria-label="Search form 1" className="Formulario_Busqueda">


                <input type="search"  placeholder="Buscar Producto..." name="phrase" aria-label="Search input 1" className="Input_Busqueda" />


                <input type="image" src="/assets/lupa.png" width="24px" className="Submit_Lupa"/>


            </form>

        </div>
        
    )
}

export default BarraBusqueda