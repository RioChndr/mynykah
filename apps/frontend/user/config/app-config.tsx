import { createContext, useContext } from "react";

const AppConfig = {
  name: 'Mynykah',
  isBeta: false,
  featureGift: false
}

const AppConfigContext = createContext(AppConfig);

export function AppConfigProvider({ children }) {
  return <AppConfigContext.Provider value={AppConfig}>{children}</AppConfigContext.Provider>
}

export function useAppConfig() {
  return useContext(AppConfigContext);
}