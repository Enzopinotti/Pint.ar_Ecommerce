const Footer = ()=>{
    return(
        <footer className="footer">
            <div className="formasDePago">
                <h4>Formas de Pago</h4>
                <img src="/assets/formas-pago-2.jpg" width={"250px"} alt="Visa"/>
            </div>
            <div className="RedesSociales">
                <h4>Seguinos en</h4>
                <section className="imgSociales">
                    <img src="/assets/logoInstagram.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/logoFacebook.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/logoTwitter.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/logoLinkedin.png" width={"30px"} alt="Instagram"/>
                    <img src="/assets/logoYoutube.png" width={"30px"} alt="Instagram"/>
                </section>
            </div>
            <div className="derechos">
                <h3>Derechos reservados &copy; Enzo Pinotti</h3>
            </div>
            
        </footer>
    )
}

export default Footer 