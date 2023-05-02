import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {

    const location = useLocation();

    console.log(location);

    let pathActual = '';

    let crumb = location.pathname.split("/")
        .filter(crumb => crumb !== '')
        .map((crumb, index) => {
            pathActual += `/${crumb}`

            return(
                <div className="crumb" key={crumb}>
                    <Link to={pathActual}>{crumb}</Link>
                </div>
            )
        })
        
    console.log(crumb)
    return (

       
       
        <div class="wrapper">

            {crumb}

        </div>

        
      
    )
  }

export default BreadCrumb;