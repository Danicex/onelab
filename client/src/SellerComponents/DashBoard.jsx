import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import './ProfileStyles.css'
import ViewProfile from './ViewProfile'
import UpdateProfile from './UpdateProfile'
import Transactions from './Transactions'
import Product from './Product'
import ViewProducts from './ViewProducts'
import Home from './Home'
import Analysis from './Analysis'
import logo from '../assets/417284f8-4190-4100-b644-290850ea0742.png'
import { FaHouse } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { AuthContext } from '../Auth/AuthContext';
import SellerChatlist from './SellerChatList'


export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [active, setActive] = useState(null);
  const { theme, setTheme } = useContext(AuthContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const toggleMenu2 = () => {
    setIsOpen2(!isOpen2)
  }
  const toggleMenu3 = () => {
    setIsOpen3(!isOpen3)
  }
  const toggleMenu1 = () => {
    setIsOpen1(!isOpen1)
  }
  const toggleMenu4 = () => {
    setIsOpen4(!isOpen4)
  }

  const renderComponents = () => {
    switch (active) {
      case 'component1': return <ViewProfile />;
      case 'component2': return <UpdateProfile />;
      case 'component3': return <Product />;
      case 'component5': return <ViewProducts />;
      case 'component6': return <Transactions />;
      case 'component7': return <Analysis />;
      case 'component8': return <Home />;
      case 'component9': return <SellerChatlist />;
      default: return <Home />;

    }
  }

  return (
    <>
      <div className='dashboard-layout'>

        <div className={isOpen1 ? `navigation-opened` : `navigation-closed`}>

          <div className='nav1'>
            <div className="m">

            <img src={logo} alt="" className="logo1" onClick={toggleMenu1} />
            <h3>onelab</h3>
            </div>


        
            <div className="darktheme-container">
              {theme === 'light' ? (<FaToggleOff id='theme-icon1' onClick={toggleTheme} />) : (<FaToggleOn onClick={toggleTheme} id='theme-icon1' />)}
            </div>

            <ul className='un-ordered'>
              <div className="nav-wrap" onClick={toggleMenu} >

                <FaHouse id='icons1' />
                {isOpen1 && (<div>
                  <p> Home ▼</p>

                </div>)}
              </div>

              {isOpen && (

                <div className="first-nav">

                  <li><p onClick={() => setActive('component8')}>dashboard</p></li>
                  <li><p onClick={() => setActive('component1')}>view profile</p>
                  </li>
                  <li><p onClick={() => setActive('component2')}>update profile</p></li>
                </div>
              )}
            </ul>
            <ul className='un-ordered'>
              <div className="nav-wrap" onClick={toggleMenu2} >
                <FaShoppingCart id='icons1' />
                {isOpen1 && (<div>
                  <p> Product ▼</p>

                </div>)}
              </div>

              {isOpen2 && (
                <div className="first-nav">
                  <li><p onClick={() => setActive('component3')}>create product</p></li>
                  <li>
                    <p onClick={() => setActive('component5')}>view products</p>
                  </li>
                </div>
              )}
            </ul>
           <div>
            <h4 onClick={toggleMenu4}>✉</h4>
              {isOpen4 &&(
              <p onClick={()=> setActive('component9')}>messages</p>
              )}
            </div>
            <ul className='un-ordered'>

              <div className="nav-wrap" onClick={toggleMenu3} >
                <SiGoogleanalytics id='icons1' />
                {isOpen1 && (<div>
                  <p> Home ▼</p>

                </div>)}
              </div>

              {isOpen3 && (
                <div className="first-nav">
                  <li><p onClick={() => setActive('component6')}>view transactions</p></li>
                  <li  >
                    <p onClick={() => setActive('component7')}  >Analysis</p>
                  </li>
                </div>
              )}
            </ul>

          </div>

          <Link to={'/logout_seller'} className='btn-logout'> <IoIosLogOut className='icons1' /> </Link>
        </div>



        <div className="dashboard-main">
          {renderComponents()}
        </div>
      </div>
    </>
  )
}
