import {applyMiddleware, combineReducers, legacy_createStore as createStore, Store} from "redux";
import profileReducer, {ProfileActionsTypes} from "./profile-reducer";
import dialogsReducer, {DialogsActionsTypes} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersActionsTypes} from "./users-reducer";
import authReducer, {AuthActionsTypes} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import appReducer from "./app-reducer";
import { reducer as formReducer } from "redux-form"

export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = Store & AppStateType & any

export let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

let store: StoreType = createStore(rootReducer,applyMiddleware(thunkMiddleware));
export default store

export type AppDispatch = typeof store.dispatch

export type AppActionsType = AuthActionsTypes | DialogsActionsTypes | ProfileActionsTypes | UsersActionsTypes;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>;


//@ts-ignore
window.store = store