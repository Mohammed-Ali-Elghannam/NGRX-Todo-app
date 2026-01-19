import { createAction, props } from "@ngrx/store";
import { AuthResponse, User } from "./auth.model";


export const registerUser = createAction(
        "[Register Page] Register User",
        props<{credentials:{name:string , email:string , password:string}}>()
);

export const registerUserSuccess = createAction(
        "[Auth Api] Register Success",
        props<{user:User}>()
);

export const registerUserFailure = createAction(
        "[Auth Api] Register Failure",
        props<{error:any}>()
);

export const loginUser = createAction(
        "[Login Page] Login User",
        props<{credentials:{email:string , password:string}}>()
);

export const loginUserSuccess = createAction(
        "[Auth Api] Login Success",
        props<{authResponse:AuthResponse}>()
);

export const loginUserFailure = createAction(
        "[Auth Api] Login Failure",
        props<{error:any}>()
);

export const logoutUser = createAction(
        "[App Logout] Logout user",
);