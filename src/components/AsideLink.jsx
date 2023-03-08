import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {IoIosArrowDown} from 'react-icons/io'
import ReactTooltip from "react-tooltip";

const AsideLink = ({menu}) => {
  const [estado, setEstado] = useState(true);

  if (menu.subMenu) { 
    return (
        <li className="">
        <button
          data-tip data-for={menu.id.toString()}
          onClick={() => setEstado(!estado)}
          type="button"
          className={` ${!estado&& 'bg-gray-100 dark:bg-gray-700'} flex items-center p-2 w-full text-sm font-normal text-gray-900 rounded-lg 
          transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
          aria-controls="dropdown-example"
          data-collapse-toggle="dropdown-example"
        >
           <i className={`${menu.icono} hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-center items-center w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white`}></i>
          <span 
            className="flex-1 ml-1 text-left whitespace-nowrap overflow-hidden"
            sidebar-toggle-item="true"
          >
            {menu.titulo}
          </span>          
          <IoIosArrowDown className={`${!estado&& 'rotate-180'} w-5 h-5`}/>          
        </button>
        <ReactTooltip id={menu.id.toString()} place="right" effect="float"  type="info" data-arrow-color="#ffffff">
              {menu.titulo}
            </ReactTooltip>
        <ul
          id="dropdown-example"
          className={`${estado&&'hidden'} block py-2 space-y-2 border-l-2 border-gray-300 dark:border-gray-700 transition-opacity duration-1000 ease-in-out`}
        >
          {menu.subMenuItems.map((nMenu, index) => <AsideLink key={index} menu={nMenu}/>)}
        </ul>
      </li>
    );
  } else {
    return (
      <>
        <li data-tip data-for={menu.id.toString()}>
          <NavLink
            to={menu.url}
            
            className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
          >
            <i className={`${menu.icono} hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-center items-center w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white`}></i>
         
            <span className="ml-1">{menu.titulo}</span>
          </NavLink>
          <ReactTooltip id={menu.id.toString()} place="right" effect="float" type="info" data-arrow-color="#ffffff">
              {menu.titulo}
            </ReactTooltip>
        </li>
      </>
    );
  }
};
export default AsideLink;
