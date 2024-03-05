'use client';
import { sendInvoiceMessage, sendTextMessage } from "@/utils/web-app-actions";
import { WebAppDataContext } from "@/utils/web-app-provider";
import { useContext, useEffect, useState } from "react";
import Item from "./components/Item";
import { motion } from "framer-motion";
import ItemLayout from "./components/ItemLayout";
import Cart from "./components/Cart";


const catalogVariants = {
  open: { height: '100%', opacity: 1 },
  closed: { height: '0' , opacity: 0 },
}

export default function Home() {
  const { state, actions } = useContext(WebAppDataContext);
  const [ items, setItems ] = useState([]);
  
  useEffect(() => {
    state.appData.BackButton.isVisible = false;
    state.appData.MainButton.isVisible = true;
  }, [state.appData]);

  const initMainButton = () => {
    state.appData.MainButton.text = `Order ${state.appAnimation.cartCount} items`;
    state.appData.MainButton.onClick(() => {
      actions.setAppAnimation({...state.appAnimation, ...{catalogIsOpen: false, selectedItem: null, cartIsOpen: true}});
      state.appData.BackButton.isVisible = true;
      state.appData.BackButton.onClick(() => {
        actions.setAppAnimation({...state.appAnimation, ...{catalogIsOpen: true, cartIsOpen: false}});
        state.appData.BackButton.isVisible = false;
        initMainButton();
      });
    });
  };
  useEffect(() => {
    initMainButton();
  }, [state.appAnimation.cartCount]);

  useEffect(() => {
    if(state.appAnimation.selectedItem !== null) {
      state.appData.BackButton.isVisible = true;
      state.appData.MainButton.text = `Item to cart`;
      state.appData.MainButton.onClick(() => {
        actions.setAppAnimation({...state.appAnimation, ...{cartCount: ++state.appAnimation.cartCount}});
      });
      state.appData.BackButton.onClick(() => {
        state.appData.BackButton.isVisible = false;
        actions.setAppAnimation({...state.appAnimation, ...{catalogIsOpen: true, selectedItem: null}});
        state.appData.MainButton.text = `Order ${state.appAnimation.cartCount} items`;
      });
    }
  }, [state.appAnimation]);

  useEffect(() => {
    if(state.appAnimation.cartIsOpen) {
      state.appData.MainButton.text = `To Checkout`;
      actions.setAppAnimation({...state.appAnimation, ...{ selectedItem: null }});
      
      state.appData.MainButton.onClick(() => {
        console.log('clicked');
        sendInvoiceMessage(state.appData);
      });

      state.appData.BackButton.onClick(() => {
        state.appData.BackButton.isVisible = false;
        actions.setAppAnimation({...state.appAnimation, ...{catalogIsOpen: true, selectedItem: null, cartIsOpen: false}});
        state.appData.MainButton.text = `Order ${state.appAnimation.cartCount} items`;
      });
    }
  }, [state.appAnimation.cartIsOpen]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(json=>setItems(json));
  },[]);

  return (
    <main className="h-full p-4">
        <motion.div className="gap-6 grid grid-cols-2 sm:grid-cols-4"
          animate={state.appAnimation.catalogIsOpen ? "open" : "closed"}
          variants={catalogVariants}
        >
          {
            items.length > 0 &&
            items.map((item: any) => (
            <Item key={item.id} item={item} themeParams={state.appData.themeParams} />
            ))
          }
        </motion.div>

      {
        state.appAnimation.selectedItem !== null && !state.appAnimation.cartIsOpen &&
          <motion.div className="w-full"
            animate={state.appAnimation.selectedItem !==null ? "open" : "closed"}
            variants={catalogVariants}
          >
            <ItemLayout themeParams={state.appData.themeParams}/>
          </motion.div>
      }

      {
        state.appAnimation.cartIsOpen &&
          <motion.div className="w-full"
            animate={state.appAnimation.cartIsOpen ? "open" : "closed"}
            variants={catalogVariants}
          >
            <Cart themeParams={state.appData.themeParams}/>
          </motion.div>
      }
    </main>
  );
}
