import React from "react";
import * as AiIcons from "react-icons/ai"
// import * as FaIcons from "react-icons/fa"
// import * as IoIcons from "react-icons/io"
import * as BsIcons from "react-icons/bs"

export const AdminMenu = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    cName:'nav-text'
  },
  {
    title: 'Topics',
    path: '/topics',
    icon: <BsIcons.BsListTask></BsIcons.BsListTask>,
    cName:'nav-text'
  },
  {
    title: 'Items',
    path: '/items',
    icon: <BsIcons.BsPencilSquare></BsIcons.BsPencilSquare>,
    cName:'nav-text'
  },
  {
    title: 'Approve items',
    path: '/itemstoapprove',
    icon:<BsIcons.BsPersonLinesFill></BsIcons.BsPersonLinesFill>,
    cName:'nav-text'
  },
  {
    title: 'Users',
    path: '/users',
    icon:<BsIcons.BsPersonLinesFill></BsIcons.BsPersonLinesFill>,
    cName:'nav-text'
  },
  {
    title: 'Logout',
    path: '/',
    icon: <BsIcons.BsPower></BsIcons.BsPower>,
    cName:'nav-text'
  }
 
]