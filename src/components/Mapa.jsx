import React from "react";

function Mapa() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4649.189298024345!2d-91.53134886567682!3d17.82967221491276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85f3c2bd64971569%3A0x237ff6dacda499f4!2sInstituto%20Tecnol%C3%B3gico%20Superior%20de%20los%20R%C3%ADos!5e0!3m2!1ses-419!2smx!4v1694985469959!5m2!1ses-419!2smx"
      className="w-100 m-0"
      loading="lazy"
      style={{ height: "500px", borderRadius: "10px" }}
    />
  );
}

export default Mapa;
