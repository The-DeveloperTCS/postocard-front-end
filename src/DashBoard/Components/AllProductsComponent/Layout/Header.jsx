import React from 'react';
import "../Styles/Header.css";
import {GrRefresh} from "react-icons/gr";
import { NavLink } from 'react-router-dom';

const Header = ({title,link,category=false ,setModal,functioncall}) => {
 
  return (
    <div className='all_product_header flex justify-end place-items-center py-3 px-5 gap-3'>
      {
        category ?   
        <button onClick={()=> setModal(true)}  className='bg-[#6E6EEF] text-white py-2 px-6 rounded-[10px]'>+ {title}</button>
       :   <NavLink to={link}>
        <button  className='bg-[#6E6EEF] text-white py-2 px-6 rounded-[10px]'>+ {title}</button>
        </NavLink>
      }
    </div>
  )
}

export default Header