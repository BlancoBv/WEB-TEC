import React from "react";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";
import Perm from "../../../../auth/Perm";

function Menus_Sec_Index() {
  const tabs = [
    { name: "Lista", route: "", icon: "fa-solid fa-table-list", show: true },
    {
      name: "Crear",
      route: "crear",
      icon: "fa-solid fa-square-plus",
      show: Perm(18),
    },
  ];
  return (
    <div className="d-flex flex-column w-100 h-100">
      <NavigationMenuUser tabs={tabs} mainRoute="noticias" />
      <div className="h-90">
        <Outlet />
      </div>
    </div>
  );
}

export default Menus_Sec_Index;
