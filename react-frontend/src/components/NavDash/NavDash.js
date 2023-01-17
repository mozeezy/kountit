import React from 'react'
import './NavDash.css'
import {AiOutlineHome, AiOutlineUser, AiOutlineProject, AiOutlineMessage} from 'react-icons/ai'
import { useState } from 'react'

const Navbar = () => {
  const [navActive, setNavActive] = useState('#');
  return (
    <nav>
      <a href="#" onClick={() => setNavActive('#')} className={navActive === '#' ? 'active': ''}> <AiOutlineHome/></a>
      <a href="#about" onClick={() => setNavActive('#about')} className={navActive === '#about' ? 'active': ''} > <AiOutlineUser/></a>
      <a href="#projects" onClick={() => setNavActive('#projects')} className={navActive === '#projects' ? 'active': ''}> <AiOutlineProject/></a>
      <a href="#contact" onClick={() => setNavActive('#contact')} className={navActive === '#contact' ? 'active': ''}> <AiOutlineMessage/></a>
    </nav>
  )
}

export default Navbar