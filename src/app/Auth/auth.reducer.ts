import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.model";
import * as AuthActions from './auth.actions' 



export const authFeatureKey = 'auth';

export const AuthinitialState : AuthState = {
        user: null,
        token:null,
        isLoading:false,
        isLoggedIn:false,
        error:null
};

export const authReducer = createReducer(
        AuthinitialState,
        on(AuthActions.registerUser , (state)=>({
                ...state,
                isLoading:true,
                error:null
        })),
        on(AuthActions.registerUserSuccess , (state ,{user}) =>({
                ...state,
                isLoading:false,
                error:null
        })),
        on(AuthActions.registerUserFailure , (state ,{error}) =>({
                ...state,
                isLoading:false,
                error:error.message || "Registeration Failed",
        })),

        on(AuthActions.loginUser , (state)=>({
                ...state,
                isLoading:true,
                error:null
        })),
        on(AuthActions.loginUserSuccess , (state ,{authResponse})=>({
                ...state,
                user:authResponse.user,
                token:authResponse.accessToken,
                isLoggedIn:true,
                isLoading:false,
                error:null
        })),

        on(AuthActions.loginUserFailure , (state ,{error})=>({
                ...state,
                user:null,
                token:null,
                isLoggedIn:false,
                isLoading:false,
                error:error.message || "Login Failed"
        })),
        on(AuthActions.logoutUser,()=>({
                ...AuthinitialState
        }))

);

