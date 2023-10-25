import React from "react";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";

function Noticias_Index() {
  const tabs = [
    { name: "Lista", route: "" },
    { name: "Crear", route: "crear" },
    { name: "Pendientes", route: "pendientes" },
  ];

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <NavigationMenuUser tabs={tabs} mainRoute="noticias" />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Noticias_Index;
