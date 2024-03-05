'use client';

import { WebAppDataContext } from "@/utils/web-app-provider";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";

export default function Cart() {
    const { state } = useContext(WebAppDataContext);
    const router = useRouter();
    
    useEffect(() => {
        state.appData.setHeaderColor(state.appData.themeParams.secondary_bg_color);
        state.appData.MainButton.isVisible = false;
        state.appData.BackButton.isVisible = true;
        state.appData.BackButton.onClick(() => {
            router.push('/');
        });
    }, [state, router]);
    return (
        <div>Cart</div>
    )
}