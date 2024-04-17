import React, { Fragment, useEffect, useState } from 'react';

import MetaData from '../layout/MetaData';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import { updatePassword, clearErrors, loadUser } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';


const UpdatePassword = ({ navigate }) => {
    const alert = useAlert();
    const dispatch = useDispatch()

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('')

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Password updated Successfully.');
            dispatch(loadUser())
            navigate('/me');

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set('oldPassword', oldPassword)
        formData.set('password', password)

        dispatch(updatePassword(formData))
    }
    
    return (
        <Fragment>
            <MetaData title={'Change password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">New Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3" disabled={loading ? true : false}>
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword