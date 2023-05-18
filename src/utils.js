import {db} from "./firebase"
import { collection, getDocs, query, where } from "firebase/firestore"


export const getProducts = () => {
    
    const ProductosCollection =  collection( db, 'productos')
    

    return getDocs(ProductosCollection)
    
        .then((respuesta)=>{
            
            const resultado = respuesta.docs.map((documento)=>{

                const producto ={
                    id:  documento.id,
                    ...documento.data()
                }
                return producto
            })
            
            return resultado
        })
        .catch((error) => {

            console.log("hubo un error en la consulta")
            console.log(error)

        })
    
    
}

export const getProductForCategory = (categoria, secundaria) => {

    let filtro = []
    
    const ProductosCollection =  collection( db, 'productos')
    if(secundaria){
        
        filtro = query(ProductosCollection, where('categoriaSec', '==', categoria))
    }
    else{

        filtro = query(ProductosCollection, where('categoriaPrim', '==', categoria))
    }
    
    return getDocs(filtro)
        .then((respuesta)=>{
                
            const resultado = respuesta.docs.map((documento)=>{

                const producto ={
                    id:  documento.id,
                    ...documento.data()
                }
                return producto
            })
            
            return resultado
        })
        .catch((error) => {

            console.log("hubo un error en la consulta")
            console.log(error)

        })
}

const saveSale = () => {
}

const getProductDetail = () => {
}