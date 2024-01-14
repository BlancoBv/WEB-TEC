import SectionContainer from "../components/SectionContainer";
import LogoGob from "../assets/img/logoheader.svg";
import Mapa from "../components/Mapa";

function Footer() {
  return (
    <footer className="footer-container">
      <SectionContainer title="Sitios locales"></SectionContainer>
      <SectionContainer title="Sitios de interés"></SectionContainer>
      {/* Footer azul */}
      <div className="footer-azul">
        <div className="info-container">
          <div className="contacto">
            <h4>Dirección</h4>
            <p>
              Km. 3 Carr. Balancán - Villahermosa, Balancán, Tabasco. C.P. 86930
            </p>
            <h4>Contacto</h4>
            <p>
              Email: cyd_drios@tecnm.mx <br />
              Conmutador: (934)-34-49000
            </p>
          </div>
          <div className="enlaces">
            <h4>Enlaces</h4>
            <a href="http://portaltransparencia.gob.mx/buscador/search/search.do?method=begin">
              Portal de transparencia
            </a>
            <a href="http://inicio.ifai.org.mx/SitePages/ifai.aspx">INAI</a>
            <a href="https://rios.tecnm.mx/rios/#">Buzón de sugerencias</a>
          </div>
          <div className="mapa">
            <Mapa />
          </div>
        </div>
        <div className="border-top d-flex flex-column align-items-center justify-content-center mt-2">
          <p> Copyright 2019 TecNM - Todos los Derechos Reservados</p>
          <p>Última actualización: 25/08/2023</p>
        </div>
      </div>
      {/* Footer verde */}
      <div className="footer-verde">
        <div className="logo-gob">
          <img src={LogoGob} alt="Logo GOB MX" width="200px" />
        </div>
        <div>
          <h5>Enlaces</h5>
          <a href="https://participa.gob.mx/">Paticipa</a>
          <a href="https://www.gob.mx/publicaciones">Publicaciones Oficiales</a>
          <a href="http://www.ordenjuridico.gob.mx/">Marco Jurídico</a>
          <a href="https://consultapublicamx.inai.org.mx/vut-web/">
            Plataforma Nacional de Trasparencia
          </a>
        </div>
        <div>
          <h5>¿Qué es gob.mx?</h5>
          <p>
            Es el portal único de trámites, información y participación
            ciudadana. <a href="https://www.gob.mx/que-es-gobmx">Leer más</a>
          </p>
          <a href="https://datos.gob.mx/">Portal de datos abiertos</a>
          <a href="https://www.gob.mx/accesibilidad">
            Declaración de accesibilidad
          </a>
          <a href="https://www.gob.mx/privacidadintegral">
            Aviso de privacidad integral
          </a>
          <a href="https://www.gob.mx/privacidadsimplificado">
            Aviso de privacidad simplicado
          </a>
          <a href="https://www.gob.mx/terminos">Terminos y condiciones</a>
          <a href="https://www.gob.mx/terminos#medidas-seguridad-informacion">
            Politica de seguridad
          </a>
          <a href="https://www.gob.mx/sitemap">Mapa de sitio</a>
        </div>
        <div className="social">
          <a href="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54">
            Denuncia contra servidores públicos
          </a>
          <div>
            <p>Siguenos en</p>
            <div>
              <a href="https://www.facebook.com/gobmexico">
                <i class="fa-brands fa-facebook-f" />
              </a>
              <a href="https://twitter.com/GobiernoMX">
                <i class="fa-brands fa-twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
