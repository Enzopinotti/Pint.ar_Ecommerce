import {NavLink} from "react-router-dom"

const SubCategoriasPinturas = () =>{
   
   
    return (

        <div className="NavBar_SubCategorias">
            <NavLink to="/category/Pintura/Cal"><button className="btnSub">A La Cal</button></NavLink>
            <NavLink to="/category/Pintura/Latex"><button className="btnSub">Al Latex</button></NavLink>
            
        </div>
        
    )
}

export default SubCategoriasPinturas