import { Component } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { mdTransitionAnimation, iosTransitionAnimation } from '@ionic/angular';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showNav: boolean = true;

  constructor (private _animationCtrl: AnimationController) { }

  pageAnimation = (baseEl: HTMLElement, opts?: any): Animation => {

    if (document.documentElement.classList.contains('md')){
        return this._animationCtrl.create()
          .addAnimation([this._animationCtrl.create()
          .addElement(opts.leavingEl)
          .duration(200)
          .iterations(1)
          .easing('ease-out')
          .fromTo('opacity', '1', '0'), 
        this._animationCtrl.create()
          .addElement(opts.enteringEl)
          .duration(280)
          .iterations(1)
          .easing('cubic-bezier(0.36,0.66,0.04,1)')
          .keyframes([
            {offset: 0, transform: 'translateY(40px)', opacity: 0.01},
            {offset: 1, transform: 'translateY(0px)', opacity: 1}
          ])]);
    } else {
      return this._animationCtrl.create()
        .addAnimation([this._animationCtrl.create()
        .addElement(opts.leavingEl)
        .duration(540)
        .iterations(1)
        .easing('cubic-bezier(0.32,0.72,0,1)')
        .keyframes([
          {offset: 0, transform: 'translateX(0)', opacity: 1},
          {offset: 1, transform: 'translateX(-40%)', opacity: 0}
        ]), 
      this._animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(540)
        .iterations(1)
        .easing('cubic-bezier(0.32,0.72,0,1)')
        .keyframes([
          {offset: 0, transform: 'translateX(100%)', opacity: 0.01},
          {offset: 1, transform: 'translateX(0)', opacity: 1}
        ])]);
    }
  }

  getHref(): string {
    console.log(iosTransitionAnimation(document.body, {baseEl: document.body, enteringEl: document.body, leavingEl: document.body}))
    return window.location.href;
  }
}
