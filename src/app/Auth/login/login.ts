import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelector from "../auth.selectors"
import * as AuthActions from "../auth.actions"

@Component({
  selector: 'app-login',
 imports: [CommonModule , RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  store$ = inject(Store);

  isLoading$! : Observable<boolean>;
  error$! :Observable<string | null>

  constructor(){
    this.isLoading$ = this.store$.select(AuthSelector.selectAuthLoading);
    this.error$ = this.store$.select(AuthSelector.selectAuthError);
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return
    }
    const {email , password } = form.value;
    this.store$.dispatch(AuthActions.loginUser({credentials: {email,password }}));

  }
}
