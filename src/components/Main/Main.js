import ItemListContainer  from "./ItemList/ItemListContainer"
import Categorias from "../../pages/Categorias"
import { Route , Routes } from "react-router-dom"
import ItemDetailContainer from "./ItemList/ItemDetail/ItemDetailContainer"


const Main = (props) => {
  return (
    <main className="main" >

     
      <Routes>
        
        <Route path="/" element={<ItemListContainer/>}/>
        <Route path="/category/:categoryId" element={<ItemListContainer/>}/>

        <Route path="/category/Pintura/:categoryId" element={<ItemListContainer Subcategoria={true}/>}/>
        <Route path="/category/Herramienta/:categoryId" element={<ItemListContainer Subcategoria={true}/>}/>

        <Route path="/Item/:itemId" element={<ItemDetailContainer/>}/>

        <Route path="*" element={<div className="Error404"><h3 className="TextoError">Error 404 - Not Found</h3></div>}/>
        
      </Routes>

    </main>
    
  )
}

export default Main

//<main className="main" >

//<h2 className="Titulo_Catalogo">{props.greeting}</h2>

//<ItemListContainer/>

//</main>