import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import * as fromActions from "./auth.actions"
import * as TodoActions from "../Todos/todo.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";


@Injectable()
export class AuthEffects {
        private actions$ = inject(Actions);
        private authService = inject(AuthService);
        private router = inject(Router);


        registerUser$ = createEffect(() =>
                this.actions$.pipe(
                        ofType(fromActions.registerUser),
                        exhaustMap(action =>
                                this.authService.register(action.credentials).pipe(
                                        map(user => fromActions.registerUserSuccess({ user })),
                                        catchError(error => of(fromActions.registerUserFailure({ error })))
                                )
                        )
                )
        );

        registerUserSuccess$ = createEffect(() =>
                this.actions$.pipe(
                        ofType(fromActions.registerUserSuccess),
                        tap(() => {
                                alert("Registeration Successful , Please Login");
                                this.router.navigate(["/login"])
                        })
                ),{dispatch:false}
        );

        loginUser$ = createEffect(()=>
                this.actions$.pipe(
                        ofType(fromActions.loginUser),
                        exhaustMap( action => 
                                this.authService.login(action.credentials).pipe(
                                        map(authResponse => fromActions.loginUserSuccess({authResponse})),
                                        catchError(error => of(fromActions.loginUserFailure({error})))
                                )
                        )
                )
        );

        loginUserSuccess$ = createEffect(() =>
                this.actions$.pipe(
                        ofType(fromActions.loginUserSuccess),
                        tap(() => {
                                this.router.navigate(["/todos"]);
                        }),
                        map(() => TodoActions.loadTodos())
                )
        );

        logoutUser$ = createEffect(()=>
                this.actions$.pipe(
                        ofType(fromActions.logoutUser),
                        tap(()=>{
                                this.router.navigate(["./login"])
                        })
                ),{dispatch:false}
        );
}