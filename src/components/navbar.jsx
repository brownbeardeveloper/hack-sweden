import React, { useState } from "react";
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai';
import sidebarData from "../data/sidebar-data";

export default function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <header className="bg-slate-200 flex justify-between items-center py-3 px-4">
                <button className="text-gray-800 text-3xl" onClick={showSidebar}>
                    <AiOutlineBars />
                </button>
            </header>

            <nav
                className={`h-screen fixed top-0 ${sidebar ? 'left-0' : '-left-full'} 
                z-50 transition-all duration-300 ease-in-out bg-slate-200`}
            >
                <ul className="flex flex-col items-start pt-20">
                    <li className="px-4 py-2 absolute top-0 right-0">
                        <button className="text-gray-800 flex items-center" onClick={showSidebar}>
                            <AiOutlineClose className="text-xl mr-2" />
                            Hide
                        </button>
                    </li>

                    {sidebarData.map((item, index) => (
                        <li key={index} className="px-4 py-2 w-full hover:bg-blue-700 hover:text-white">
                            <a
                                href={item.path} // Changed href to to
                                className="flex items-center px-2 py-1"
                                onClick={showSidebar}
                            >
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
