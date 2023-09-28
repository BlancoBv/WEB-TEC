import { createContext, useState } from "react";
import Base from "./layout/Base";
import { AlertSuccess } from "../../components/Alerts";

export const AlertsContexts = createContext(null);

function IndexMenu() {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const showSuccess = () => {
    setShowAlertSuccess(true);
  };

  const closeAlerts = () => {
    setShowAlertSuccess(false);
  };

  return (
    <div>
      <AlertSuccess show={showAlertSuccess} />
      <AlertsContexts.Provider value={{ showSuccess, closeAlerts }}>
        <Base />
      </AlertsContexts.Provider>
    </div>
  );
}

export default IndexMenu;
