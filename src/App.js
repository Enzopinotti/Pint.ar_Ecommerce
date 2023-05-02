
//rafce para autocompletar

import Header from '../../ecomerce0/src/components/Header/Header'
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import {BrowserRouter} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      
      <Header/>

      <Main greeting="Nuestro catalogo"/>

      <Footer/>
      
        
    </BrowserRouter>
    
  );
}

export default App;
