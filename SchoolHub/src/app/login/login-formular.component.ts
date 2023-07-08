import { Component } from '@angular/core';
import { LoginInterractService } from './login-interract.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login-formular',
  templateUrl: './login-formular.component.html',
  styleUrls: ['./login-formular.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginFormularComponent {
  constructor(public loginInterract: LoginInterractService) {}
}