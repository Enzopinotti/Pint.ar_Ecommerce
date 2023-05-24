import Header from './components/Header/Header'
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import {BrowserRouter} from "react-router-dom"
import CustomProvider from "./components/Providers/CustomProvider"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (

    <BrowserRouter>

      <CustomProvider>

        <Header/>

        <Main/>

        <Footer/>

        <ToastContainer/>
        
      </CustomProvider>

    </BrowserRouter>


  );
}

export default App;