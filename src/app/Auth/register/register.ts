import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormsModule , NgForm} from "@angular/forms"
import { Store } from '@ngrx/store';
import * as AuthSelector from "../auth.selectors"
import * as AuthActions from "../auth.actions"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [CommonModule , RouterLink,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

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
    const { name , email , password } = form.value;
    this.store$.dispatch(AuthActions.registerUser({credentials: { name,email,password }}));

  }

}
