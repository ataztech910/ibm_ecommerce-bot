'use client';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { WebApp as WebAppTypes } from "@twa-dev/types";
import WebApp from "@twa-dev/sdk";

interface IState {
  appData: WebAppTypes,
  appAnimation: any
}

interface IActions {
  setAppData: Dispatch<SetStateAction<WebAppTypes>>,
  setAppAnimation: Dispatch<SetStateAction<any>>
}

const WebAppDataContext = createContext({state: {} as IState, actions: {} as IActions});

const WebAppDataProvider = ({ children }: any) => {
  const [appData, setAppData] = useState({} as WebAppTypes);
  const [appAnimation, setAppAnimation] = useState({});

  const value = {
    state: { appData, appAnimation },
    actions: { setAppData, setAppAnimation },
  };

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      console.log('window is defined');
      const app = WebApp;
      if (app) {
        app.ready();
        app.setHeaderColor(app.themeParams.bg_color);
        app.setBackgroundColor('bg_color');
        app.expand();
        app.isExpanded = true;
        app.isClosingConfirmationEnabled = true;
        setAppData(app);
        console.log('window is defined app', app);
      }
    }
    setAppAnimation({ cartCount: 0, catalogIsOpen: true, selectedItem: null, cartIsOpen: false });
  },[]);

  return (
    <WebAppDataContext.Provider value={value}>
      {children}
    </WebAppDataContext.Provider>
  )
}
export { WebAppDataProvider, WebAppDataContext};


