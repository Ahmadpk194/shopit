import React, { Fragment, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';



const Header = ({ navigate }) => {
    const [keyword, setKeyword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart)

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            navigate(`/search/${keyword}`)
        } else {
            navigate(`/`)
        }
    }

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out Successfully!')
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to='/'>
                            <img src="/images/logo.png" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    {/* <Routes> */}
                    {/* <Route render={(history) => <Search history={history} />} /> */}
                    {/* </Routes> */}
                    <form onSubmit={searchHandler}>
                        <div className="input-group">
                            <input
                                type="text"
                                id="search_field"
                                className="form-control"
                                placeholder="Enter Product Name ..."
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button id="search_btn" className="btn">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to={'/cart'} style={{ textDecoration: "none" }}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to={'#'} className='btn dropdown-toggle text-white mr-4' type='button' id='dropDownMenuButton' data-toggle='dropdown' aria-haspopup="true" aria-expanded="false" >
                                <figure className="avatar avatar-nav">
                                    <img src={user.avatar && user.avatar.url} alt={user && user.name} className='rounded-circle' />
                                </figure>
                                <span> {user && user.name} </span>
                            </Link>
                            {/* Dropdown menu */}
                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className='dropdown-item' to='/dashboard'>Dashboard</Link>
                                )}
                                <Link className='dropdown-item' to='/orders/me'>Orders</Link>
                                <Link className='dropdown-item' to='/me'>Profile</Link>
                                <Link className='dropdown-item text-danger' to={'/'} onClick={logoutHandler}>
                                    Logout
                                </Link>
                            </div>
                        </div>

                    ) :  <Link to='/login' className="btn ml-4" id="login_btn">Login</Link>}

                </div>
            </nav>
        </Fragment>
    )
}

export default Header