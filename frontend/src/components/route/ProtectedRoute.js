import React, { Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);

    return (
        <Fragment>
            {!loading && (
                <Route
                    {...rest}
                    element={
                        isAuthenticated ? (
                            isAdmin && user.role !== 'admin' ? (
                                <Navigate to='/' />
                            ) : (
                                <Component {...props} />
                            )
                        ) : (
                            <Navigate to='/login' />
                        )
                    }
                />
            )}
        </Fragment>
    );
}

export default ProtectedRoute;
