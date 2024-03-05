import { WebAppDataContext } from "@/utils/web-app-provider";
import { useContext } from "react";
import CartIcon from "./CartIcon";

export default function Header() {
    const { state } = useContext(WebAppDataContext);
    return (
        <header className="fixed flex justify-between align-middle z-50 w-full"
                style={{backgroundColor: state.appData.themeParams.bg_color}}
            >
            <div className="p-4 text-2xl"
                style={{color: state.appData.themeParams.text_color}}
            >
                YOUR-LOGO-HERE
            </div>
            <CartIcon color={state.appData.themeParams.text_color} number={state.appAnimation.cartCount} />
        </header>
    )
}