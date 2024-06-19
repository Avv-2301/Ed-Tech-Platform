import React, { lazy } from 'react';
import {NavbarLinks} from '../../data/navbar-links';
import { Link, matchPath } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useLocation } from 'react-router-dom';



const Navbar = () => {
    const location = useLocation();
    const matchRoute = (route) =>{
        return matchPath({path:route}, location.pathname)
    }
  return (
    <div className='flex h-14 items-center border-b-[1px] border-b-richblack-700 justify-center'>
        <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
        {/* IMAGE */}
            <Link to='/'>
                <img src={logo} alt="logo" width={160} height={32} loading='lazy'/>
            </Link>

            {/* NAV LINKS */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) =>{
                            return(
                                <li key={index}>
                               {
                                 link.title === "Catalog" ? (<div></div>) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                        {link?.title}
                                        </p>
                                    </Link>
                                 )
                               }
                            </li>
                            )
                        })
                    }
                </ul>
            </nav>

            {/* LOGIN/SIGNUP */}

            <div className='flex gap-x-4 items-center'>

            </div>

        </div>
    </div>
  )
}

export default Navbar;