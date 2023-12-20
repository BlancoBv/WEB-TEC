import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";

function Menus_Index() {
  const tabs = [{ name: "Lista", route: "", icon: "fa-solid fa-table-list" }];
  return (
    <div className="d-flex flex-column w-100 h-100">
      <NavigationMenuUser tabs={tabs} mainRoute="noticias" />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Menus_Index;
