import { createContext, useState } from "react";
import Base from "./layout/Base";
import { AlertSuccess, AlertError } from "../../components/Alerts";

export const AlertsContexts = createContext(null);

function IndexMenu() {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState({
    status: false,
    text: "",
  });

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
