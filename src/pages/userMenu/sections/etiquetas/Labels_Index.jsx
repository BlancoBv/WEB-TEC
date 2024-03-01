import Perm from "../../../../auth/Perm";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";
function Labels_Index() {
  const tabs = [
    {
      name: "Lista",
      route: "",
      icon: "fa-solid fa-table-list",
      show: Perm(16),
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

export default Labels_Index;
