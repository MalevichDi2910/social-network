import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {AppDispatch} from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}} as const)

export type AuthActionsTypes = ReturnType<typeof setAuthUserData>

export const getAuthUserData = () => (dispatch: Dispatch) => {
        return authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email } = response.data.data
                    dispatch(setAuthUserData(id, email, login, true))
                }
            })
    }

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<AppDispatch>) => {
    authAPI.logIn(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}

export type initialStateType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: initialStateType = initialState, action: AuthActionsTypes) : initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default authReducer;