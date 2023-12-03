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
  const closeAlerts = () => {
    setShowAlertSuccess(false);
    setShowAlertError({ status: false, text: "" });
  };

  return (
    <div>
      <AlertSuccess show={showAlertSuccess} />
      <AlertError show={showAlertError.status} text={showAlertError.text} />
      <AlertsContexts.Provider value={{ showSuccess, showError, closeAlerts }}>
        <Base />
      </AlertsContexts.Provider>
    </div>
  );
}

export default IndexMenu;
