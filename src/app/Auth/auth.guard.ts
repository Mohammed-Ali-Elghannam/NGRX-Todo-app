import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { selectIsLoggedIn } from "./auth.selectors";
import { map, Observable, take, tap } from "rxjs";


export const authGuard :CanActivateFn = (route,state) =>{
        const router = inject(Router);
        const store = inject(Store);

        return store.select(selectIsLoggedIn).pipe(
                take(1),
                map(isLoggedIn =>{
                        if(isLoggedIn){
                                return true;
                        }else{
                                router.navigate(["/login"]);
                                return false;
                        }
                })
        )
}
