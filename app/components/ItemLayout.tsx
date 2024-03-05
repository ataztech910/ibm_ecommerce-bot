'use client';
import { lightenDarkenColor } from "@/utils/colors";
import { WebAppDataContext } from "@/utils/web-app-provider";
import { useContext, useEffect, useState } from "react";

export default function ItemLayout({themeParams}: any) {
    const { state, actions } = useContext(WebAppDataContext);
    const [ item, setItem ] = useState({} as any);
    
    useEffect(() => {
        if(state.appAnimation.selectedItem && state.appAnimation.selectedItem !== null) {
        console.log('https://fakestoreapi.com/products/' + state.appAnimation.selectedItem);
        fetch('https://fakestoreapi.com/products/' + state.appAnimation.selectedItem)
            .then(res=>res.json())
            .then(json=>setItem(json));
        }
    }, [state.appAnimation.selectedItem]);

    if(item === null) {
        return (<></>);
    }

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg mb-4"
                         style={
                            {
                                backgroundColor: `${lightenDarkenColor(themeParams.secondary_bg_color, 85)}`,
                            color: `${themeParams.section_header_text_color}`
                            }
                        }>
                            <img className="w-full h-full object-cover" 
                                    src={item.image} alt={item.title} />
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold mb-2"
                             style={{color: `${themeParams.section_header_text_color}`}}
                        >{item.title}</h2>
                        <p className="text-sm mb-4"
                            style={{color: `${themeParams.section_header_text_color}`}}
                        >
                            {item.description}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4" 
                                style={{color: `${themeParams.section_header_text_color}`}}
                            >
                                <span className="font-bold">Price:</span>
                                <span> $ {item.price}</span>
                            </div>
                            
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>

    )
}