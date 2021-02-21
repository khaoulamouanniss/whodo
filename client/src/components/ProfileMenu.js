import React from "react";
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import * as BsIcons from "react-icons/bs"

export const ProfileMenu = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome></AiIcons.AiFillHome>,
    cName:'nav-text'
  },
  {
    title: 'My items',
    path: '/myitems',
    icon: <BsIcons.BsListTask></BsIcons.BsListTask>,
    cName:'nav-text'
  },
  {
    title: 'Submit Item',
    path: '/submit',
    icon: <BsIcons.BsPencilSquare></BsIcons.BsPencilSquare>,
    cName:'nav-text'
  },
  {
    title: 'My account',
    path: '/account',
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