import {
    GET_USER, GET_USER_FAILURE, GET_USER_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS
} from "./actionTypes";
import {CALL_API} from "../../middleware/api";

const prefix = process.env.MIX_API_PREFIX;

export const login = (email, password) => ({
    [CALL_API]: {
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
        endpoint: '/oauth/token',
        method: 'POST',
        body: {
            grant_type: 'password',
            client_id: process.env.MIX_CLIENT_ID,
            client_secret: process.env.MIX_CLIENT_SECRET,
            username: email,
            password,
            scope: '*'
        }
    }
});

export const logout = () => ({
    type: LOGOUT_SUCCESS
});

export const attemptTokenRefresh = (refreshToken) => ({
    [CALL_API]: {
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
        endpoint: '/oauth/token',
        method: 'POST',
        body: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.MIX_CLIENT_ID,
            client_secret: process.env.MIX_CLIENT_SECRET,
            scope: ''
        }
    }
});

export const getUser = () => ({
    [CALL_API]: {
        types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE],
        endpoint: `${prefix}/user`,
        method: 'GET'
    }
});