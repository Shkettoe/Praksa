import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { User } from '../models/User'
import { connect } from 'react-redux'

const Nav = (props: {user: User}) => {
    const logout = async()=>{
      await axios.post('users/logout', {})
      return <Navigate to={'login'}/>
    }
  
    return (
        <div>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Hyperion Corporation</a>
                <ul className="my-2 my-md-0 mr-md-3">
                  <NavLink to={`/${props.user.id}/edit`} className="p-2 text-white text-decoration none">{props.user.username}</NavLink>
                  <NavLink onClick={logout} className="p-2 text-white text-decoration none" to={'login'}>Sign Out</NavLink>
                </ul>
            </header>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to={'/'}>
                    Dashboard
                  </NavLink>
                  <NavLink className="nav-link" aria-current="page" to={'/users'}>
                    Users
                  </NavLink>
                  <NavLink className="nav-link" aria-current="page" to={'/roles'}>
                    Roles
                  </NavLink>
                  <NavLink className="nav-link" aria-current="page" to={'/products'}>
                    Products
                  </NavLink>
                  <NavLink className="nav-link" aria-current="page" to={'/orders'}>
                    Orders
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    )
}

const mapStateToProps = (state: {user: User}) => {
  return{
      user: state.user
  }
}

export default connect(mapStateToProps)(Nav)