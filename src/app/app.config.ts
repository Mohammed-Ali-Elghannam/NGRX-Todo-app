import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';

import {AuthEffects} from "./Auth/auth.effects";
import {TodoEffects} from "./Todos/todo.effects";
import * as fromAuth from "./Auth/auth.reducer";
import * as fromTodos from "./Todos/todo.reducer";
import {localStorageSync} from "ngrx-store-localstorage";
import { provideHttpClient } from '@angular/common/http';


const keysToSync = [fromAuth.authFeatureKey,fromTodos.todoFeatureKey];

function localStorageSyncReducer(reducer : ActionReducer<any>) : ActionReducer<any> {
  return localStorageSync({
    keys: keysToSync,
    rehydrate:true,
    storage: window.localStorage,
    removeOnUndefined: true
  })(reducer)
};

const metaReducers = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({router:routerReducer},{metaReducers}),
    provideState(fromAuth.authFeatureKey , fromAuth.authReducer),
    provideState(fromTodos.todoFeatureKey , fromTodos.todoReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    provideEffects([AuthEffects,TodoEffects])
]
};
