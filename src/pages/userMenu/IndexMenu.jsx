import { createContext, useEffect, useState } from "react";
import Base from "./layout/Base";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import useGetData from "../../hooks/useGetData";

export const AlertsContexts = createContext(null);

function IndexMenu() {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState({
    status: false,
    text: "",
  });
  const roles = useGetData("/auth/roles");

  console.log(roles);
  const showSuccess = () => {
    setShowAlertSuccess(true);
    setTimeout(() => {
      setShowAlertSuccess(false);
    }, 1000);
  };

  const showError = (text) => {
    setShowAlertError({ status: true, text });
    setTimeout(() => {
      setShowAlertError({ status: false, text: "" });
    }, 1000);
  };
  useEffect(() => {
    const userRol = JSON.parse(localStorage.getItem("user")).rol || null;
    if (!roles.isPending) {
      const rolesFiltered = roles.data.response.filter(
        (el) => el.rol === userRol
      );

      localStorage.setItem(
        "permisos",
        JSON.stringify(rolesFiltered[0].permisos_permitidos)
      );
    }
  }, [roles]);

  return (
    <>
      <AlertSuccess show={showAlertSuccess} />
      <AlertError show={showAlertError.status} text={showAlertError.text} />
      <AlertsContexts.Provider value={{ showSuccess, showError }}>
        <Base />
      </AlertsContexts.Provider>
    </>
  );
}

export default IndexMenu;
