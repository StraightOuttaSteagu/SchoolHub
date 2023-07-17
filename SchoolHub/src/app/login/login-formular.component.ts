import { Component } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { LoginInterractService } from './login-interract.service';

@Component({
  selector: 'app-login-formular',
  templateUrl: './login-formular.component.html',
  styleUrls: ['./login-formular.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('signup', style({
        height: '0px',
        fontSize: '0',
        padding: '0',
        margin: '0'
      })),
      state('login', style({
        height: '*',
        fontSize: '20px',
        padding: '10px'
      })),
      transition('login <=> signup', [
        animate('200ms linear')
      ])
    ]),
    trigger('changeMargin', [state('signup', style({
      marginBottom: '0'
    })),
    state('login', style({
      marginBottom: '20px'
    })),
    transition('login <=> signup', [
      animate('300ms linear')
    ])])
  ],
})
export class LoginFormularComponent {

  interract: LoginInterractService = this.loginInterract;

  authForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
    repeatPassword: ['', Validators.required]
  });

  constructor(private loginInterract: LoginInterractService, private fb: FormBuilder) {
  }

  onSubmit(): void {
    console.log(this.authForm.value);
  }

  // TODO: good practices:
  // services injcected into constructor should be private _/
  // variables order: private first, public after _/
  // functions order: public first, private after _/
  // you should use reactive forms _/
  // you can use ngSubmit _/
  // always add the type to variables and also the returned type for functions _/
}