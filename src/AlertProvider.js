import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export  function useAlert() {
  return useContext(AlertContext);
}

export default function AlertProvider({ children }) {
  const [showAlert, setShowAlert] = useState(false);

  const showAlertFn = () => setShowAlert(true);
  const hideAlertFn = () => setShowAlert(false);

  const value = {
    showAlert,
    showAlertFn,
    hideAlertFn,
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
