import React from "react";
import LogoGobMx from "../assets/img/placa-gob1.png";
import LogoSep from "../assets/img/placa-gob2.png";
import LogoTec from "../assets/img/placa_tecnm.jpg";
import useGetData from "../hooks/useGetData";
import Dropdown from "./Dropdown";

function WhiteBar() {
  const { data, isPending, error } = useGetData("/menu-blanco/obtener");
  console.log(data);
  return (
    <div className="white-bar" id="white-bar">
      <div className="images-container">
        <a className="imageOpacity" href="https://www.gob.mx">
          <img src={LogoGobMx} />
        </a>
        <a className="imageOpacity" href="https://www.gob.mx/sep">
          <img src={LogoSep} />
        </a>
        <a className="imageOpacity" href="https://www.tecnm.mx/">
          <img src={LogoTec} />
        </a>
      </div>
      <nav>
        {!isPending &&
          data.response.map((el) =>
            el.white_submenus.length > 0 ? (
              <Dropdown
                background="#ffff"
                items={el.white_submenus}
                key={el.idmenu}
                targetUrl="url"
                targetName="nombre"
              />
            ) : (
              <a href={el.url} key={el.idmenu}>
                {el.nombre}
              </a>
            )
          )}
      </nav>
    </div>
  );
}

export default WhiteBar;
