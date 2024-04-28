import React, { useState } from "react";
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai';
import sidebarData from "../data/sidebar-data";

export default function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    return (
        <>
            <header className="bg-slate-200 flex justify-between items-center py-3 px-4">
                <button className="text-gray-800 text-3xl" onClick={() => setSidebar(!sidebar)}>
                    <AiOutlineBars />
                </button>
            </header>

            <nav
                className={`h-screen fixed top-0 ${sidebar ? 'left-0' : '-left-full'} 
                z-50 transition-all duration-300 ease-in-out bg-slate-200`}
            >
                <ul className="flex flex-col items-start pt-20">
                    <li className="px-4 py-2 absolute top-0 right-0 text-2xl">
                        <button className="text-gray-800 flex items-center" onClick={() => setSidebar(!sidebar)}>
                            <AiOutlineClose className="mr-2" />
                            Dölj
                        </button>
                    </li>


                    {sidebarData.map((item, index) => (
                        <a
                            key={index}
                            href={item.path} // Changed href to to
                            className="flex items-center w-96 pl-10 hover:bg-neutral-400 hover:text-white"
                            onClick={(e) => {
                                e.preventDefault();
                                setSidebar(!sidebar);
                            }}
                        >
                            <li className="flex flex-row justify-center items-center py-5 text-2xl">
                                {item.icon}
                                <span className="ml-4">{item.title}</span>
                            </li>
                        </a>
                    ))}
                </ul>
            </nav>
        </>
    );
}
