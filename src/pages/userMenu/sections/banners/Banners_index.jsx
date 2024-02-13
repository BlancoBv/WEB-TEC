import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";

function Banners_index() {
  const tabs = [{ name: "Lista", route: "", icon: "fa-solid fa-table-list" }];
  return (
    <div className="d-flex flex-column w-100 h-100">
      <NavigationMenuUser tabs={tabs} mainRoute="noticias" />
      <div className="h-90">
        <Outlet />
      </div>
    </div>
  );
}

export default Banners_index;
