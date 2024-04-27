import React from "react";
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'

const sidebarData = [
    {
        title: 'Home',
        path: '/',
        icon : <AiIcons.AiFillHome />,

    },
    {
        title: 'Contact',
        path: '/contact',
        icon : <BiIcons.BiWorld />,

    },
    {
        title: 'About us',
        path: '/about-us',
        icon : <BiIcons.BiWorld />,

    },
]

export default sidebarData