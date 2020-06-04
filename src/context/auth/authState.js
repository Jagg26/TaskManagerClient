import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';

import {
    REGISTER_SUCCESFULL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESFULL,
    LOGIN_ERROR,
    LOG_OUT
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        message: null,
        loading: true
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Functions

    const registerUser = async info => {
        try {
            const response = await axiosClient.post('/api/users', info);
            console.log(response.data);

            dispatch({
                type: REGISTER_SUCCESFULL,
                payload: response.data
            });

            // Get User
            authUser();
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    //return auth user

    const authUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            //console.log(response);
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //User logs in
    const logIn = async info => {
        try {
            const response = await axiosClient.post('api/auth', info);
            dispatch({
                type: LOGIN_SUCCESFULL,
                payload: response.data
            })
            authUser();
        } catch (error) {
            const alert = {
            msg: error.response.data.msg,
             category: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    //Log Out
    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                authUser,
                logIn,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;