import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

function SubscriptionsPage() {
    const location = useLocation()
    return (
    <div className='main-pages'>
        <h1>
            Subscriptions
        </h1>
        <nav className='main-nav'>
          <ul>
            <li className={location.pathname.match(/subscriptions\/*$/)?'selected-link':''}>
              <Link to='.'>All Members</Link>
            </li>
            <li className={location.pathname.match(/subscriptions\/add\/*$/)?'selected-link':''}>
              <Link to='add'>Add Member</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
    </div>
    )
}

export default SubscriptionsPage
