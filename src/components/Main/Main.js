import ItemListContainer  from "./ItemList/ItemListContainer"
import SobreNosotros from "../Main/ItemList/SobreNosotros/SobreNosotros"
import { Route , Routes } from "react-router-dom"
import ItemDetailContainer from "./ItemList/ItemDetail/ItemDetailContainer"
import CartContainer from "../Main/ItemList/Cart/CartContainer"
import Checkout from "../Main/ItemList/Checkout/Checkout"
import CheckoutContainer from "./ItemList/Checkout/CheckoutContainer"





const Main = () => {
  return (
    
    <main className="main" >

      <Routes>
        
        <Route path="/" element={<ItemListContainer/>}/>
        <Route path="/category/:categoryId" element={<ItemListContainer/>}/>

        <Route path="/category/Pintura/:categoryId" element={<ItemListContainer Subcategoria={true}/>}/>
        <Route path="/category/Herramienta/:categoryId" element={<ItemListContainer Subcategoria={true}/>}/>

        <Route path="/Item/:itemId" element={<ItemDetailContainer/>}/>
        
        <Route path="/carrito" element={<CartContainer/>}/>

        <Route path="/checkout" element={<CheckoutContainer/>}/>

        <Route path="/sobreNosotros" element={<SobreNosotros/>}/>

        <Route path="*" element={<div className="Error404"><h3 className="TextoError">Error 404 - Not Found</h3></div>}/>
        
      </Routes>

    </main>
    
  )
}

export default Main

