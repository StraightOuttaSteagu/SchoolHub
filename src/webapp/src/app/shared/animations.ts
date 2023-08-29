import { animate, AnimationTriggerMetadata, state, style, transition, trigger, } from '@angular/animations';
import { AnimationController, Animation } from '@ionic/angular';

export const CollapseAnimationFade: AnimationTriggerMetadata = trigger(
  'fadeInOut',
  [
    state(
      'login',
      style({
        margin: '0',
        fontSize: '0',
        height: '0',
        padding: '0',
        borderWidth: '0'
      })
    ),
    state(
      'signup',
      style({
        margin: '*',
        fontSize: '*',
        height: '*',
        padding: '*',
        borderWidth: '*'
      })
    ),
    transition('login <=> signup', [animate('200ms ease-in-out')]),
  ]
);

export const pageAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const animationCtrl = new AnimationController();

  if (document.documentElement.classList.contains('md')){
      return animationCtrl.create()
        .addAnimation([animationCtrl.create()
        .addElement(opts.leavingEl)
        .duration(200)
        .iterations(1)
        .easing('ease-out')
        .fromTo('opacity', '1', '0'), 
      animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(280)
        .iterations(1)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .keyframes([
          {offset: 0, transform: 'translateY(40px)', opacity: 0.01},
          {offset: 1, transform: 'translateY(0px)', opacity: 1}
        ])]);
  } else {
    return animationCtrl.create()
      .addAnimation([animationCtrl.create()
      .addElement(opts.leavingEl)
      .duration(540)
      .iterations(1)
      .easing('cubic-bezier(0.32,0.72,0,1)')
      .keyframes([
        {offset: 0, transform: 'translateX(0)', opacity: 1},
        {offset: 1, transform: 'translateX(-33.33%)', opacity: 0}
      ]), 
    animationCtrl.create()
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