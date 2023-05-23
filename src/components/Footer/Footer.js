const Footer = ()=>{
    return(
        <footer className="footer">
            <div className="formasDePago">
                <h4>Formas de Pago</h4>
                <img src="/assets/formasDePago.jpg" width={"250px"} alt="Formas de Pago"/>
            </div>
            <div className="RedesSociales">
                <h4>Seguinos en</h4>
                <section className="imgSociales">
                    <img src="/assets/redesSociales/logoInstagram.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/redesSociales/logoFacebook.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/redesSociales/logoTwitter.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/redesSociales/logoLinkedin.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/redesSociales/logoYoutube.png" width={"30px"} alt="Instagram"/>
                </section>
            </div>
            <div className="derechos">
                <h3>Derechos reservados &copy; Enzo Pinotti</h3>
            </div>
            
        </footer>
    )
}

export default Footer 