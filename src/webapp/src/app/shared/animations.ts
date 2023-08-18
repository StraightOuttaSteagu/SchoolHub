import { animate, AnimationTriggerMetadata, state, style, transition, trigger, } from '@angular/animations';

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

export const removeText: AnimationTriggerMetadata = trigger(
  'fadeInOut',
  [
    state(
      'login',
      style({
        height: '0',
        fontSize: '0',
        padding: '0',
        margin: '0',
      })
    ),
    state(
      'signup',
      style({
        height: '*',
        fontSize: '*',
        padding: '*',
      })
    ),
    transition('login <=> signup', [animate('175ms ease-in-out')]),
  ]
);