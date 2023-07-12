import { Component } from '@angular/core';
import { LoginInterractService } from './login-interract.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  constructor(public loginInterract: LoginInterractService) {
  }

  // TODO: good practices:
  // services injcected into constructor should be private
  // variables order: private first, public after
  // functions order: public first, private after
  // you should use reactive forms
  // you can use ngSubmit
  // always add the type to variables and also the returned type for functions

  submit(): void {
    alert('submited');
  }
}