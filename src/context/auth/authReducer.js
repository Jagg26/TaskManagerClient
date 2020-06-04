import {
    REGISTER_SUCCESFULL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESFULL,
    LOGIN_ERROR,
    LOG_OUT
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case REGISTER_SUCCESFULL:
        case LOGIN_SUCCESFULL:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                auth: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                auth: true,
                user: action.payload,
                loading: false
            }
        case LOG_OUT:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                auth: null,
                message: action.payload,
                loading: false
            }
        default:
            return state;
    }
}