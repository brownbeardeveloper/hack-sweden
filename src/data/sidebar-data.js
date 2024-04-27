import React from "react";
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'

const sidebarData = [
    {
        title: 'Hem',
        path: '/',
        icon : <AiIcons.AiFillHome />,

    },
    {
        title: 'Kontakt',
        path: '/contact',
        icon : <BiIcons.BiWorld />,

    },
    {
        title: 'Om oss',
        path: '/about-us',
        icon : <BiIcons.BiWorld />,

    },
]

export default sidebarData