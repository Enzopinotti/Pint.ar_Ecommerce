
//rafce para autocompletar

import Header from './components/Header/Header'
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import {BrowserRouter} from "react-router-dom"
import CustomProvider from "./components/Providers/CustomProvider"


function App() {
  return (

    

    
    <BrowserRouter>

      
      <CustomProvider>
    
      
        <Header/>

        <Main greeting="Nuestro catalogo"/>

        <Footer/>

      </CustomProvider>
      
        
    </BrowserRouter>

    
    
  );
}

export default App;
