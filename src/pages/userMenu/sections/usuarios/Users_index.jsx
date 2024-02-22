import React from "react";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";
function Users_index() {
  const tabs = [
    { name: "Lista de usuarios", route: "", icon: "fa-solid fa-table-list" },
    {
      name: "Permisos",
      route: "permisos",
      icon: "fa-solid fa-user-shield",
    },
    {
      name: "Roles",
      route: "roles",
      icon: "fa-solid fa-person-circle-question",
    },
  ];
  return (
    <div className="d-flex flex-column w-100 h-90">
      <NavigationMenuUser tabs={tabs} mainRoute="noticias" />
      <div className="h-90">
        <Outlet />
      </div>
    </div>
  );
}

export default Users_index;
