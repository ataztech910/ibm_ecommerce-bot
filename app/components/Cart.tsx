import { lightenDarkenColor } from "@/utils/colors";
import { useEffect, useState } from "react";

export default function Cart({themeParams}) {
    const [ items, setItems ] = useState([]);
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/carts')
          .then(res=>res.json())
          .then(json=>setItems(json));
    },[]);
      
    return (
        <>
            <section className="w-full h-screen">
                <div className="mx-auto">
                    <div className="rounded-3xl shadow-lg"
                        style={
                            {
                                backgroundColor: `${lightenDarkenColor(themeParams.secondary_bg_color, 85)}`,
                                color: `${themeParams.section_header_text_color}`
                            }
                        }
                    >
                        <div className="px-4 py-6">
                        <div className="flow-root">
                            <ul className="-my-8">
                            <li className="flex py-6 text-left flex-row space-x-5 space-y-0">
                                <div className="shrink-0 relative">
                                <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">1</span>
                                <img className="h-24 w-24 max-w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1588484628369-dd7a85bfdc38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNuZWFrZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=150&q=60" alt="" />
                                </div>

                                <div className="relative flex flex-1 flex-col justify-between">
                                <div className="col-gap-5 grid grid-cols-2">
                                    <div className="pr-5">
                                    <p className="text-base font-semibold">Nike Air Max 2019</p>
                                    <p className="mx-0 mt-1 mb-0 text-sm">36EU - 4US</p>
                                    </div>

                                    <div className="flex justify-between mt-0 items-startjustify-end">
                                    <p className="shrink-0 w-20 text-base font-semibold order-2 ml-8 text-right">$1259.00</p>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                    <button type="button" className="flex rounded p-2 text-center transition-all duration-200 ease-in-out focus:shadow ">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                                    </svg>
                                    </button>
                                </div>
                                </div>
                            </li>
                            
                            </ul>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-b py-8">
                            <div className="flex items-center justify-between">
                            <p className="text-gray-400">Subtotal</p>
                            <p className="text-lg font-semibold ">$2399.00</p>
                            </div>
                            <div className="flex items-center justify-between">
                            <p className="text-gray-400">Shipping</p>
                            <p className="text-lg font-semibold ">$8.00</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium ">Total</p>
                            <p className="text-2xl font-semibold "><span className="text-xs font-normal text-gray-400">USD</span> 2499.00</p>
                        </div>

                        
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}