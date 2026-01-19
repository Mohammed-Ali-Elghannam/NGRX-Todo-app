import { Component, inject, OnInit } from '@angular/core';
import { RouterLink , Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from "./Auth/auth.actions";
import * as AuthSelectors from "./Auth/auth.selectors";
import { User } from './Auth/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive ,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
 

  private store = inject(Store);
  

  isLoggedIn$!:Observable<boolean>;
  user$!:Observable<User | null>;

  constructor(){
    this.isLoggedIn$ = this.store.select(AuthSelectors.selectIsLoggedIn);
    this.user$ = this.store.select(AuthSelectors.selectUser);
  }

   ngOnInit(): void {
    
  }

  logout(){
    this.store.dispatch(AuthActions.logoutUser());
  }
}
