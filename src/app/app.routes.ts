import { Routes } from '@angular/router';
import { authGuard } from './Auth/auth.guard';

export const routes: Routes = [
        {
                path:'',
                redirectTo:'login',
                pathMatch:'full'
        },
        {
                path:"login",
                loadComponent: ()=> import("./Auth/login/login").then(m => m.Login)
        },
        {
                path:"register",
                loadComponent: ()=> import("./Auth/register/register").then(m => m.Register)
        },
        {
                path:"todos",
                loadComponent: ()=> import("./Todos/todo-list/todo-list").then(m => m.TodoList),
                canActivate:[authGuard]
        },
];
