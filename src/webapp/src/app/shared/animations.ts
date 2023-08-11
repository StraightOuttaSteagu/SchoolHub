import { animate, AnimationTriggerMetadata, state, style, transition, trigger, } from '@angular/animations';

export const SwitchAnimation: AnimationTriggerMetadata = trigger('status', [
  state(
    'false',
    style({
      color: '#D9D9D9',
      backgroundColor: '#292251',
      border: 'none',
    })
  ),
  state(
    'true',
    style({
      color: '#292251',
      backgroundColor: 'rgb(255, 255, 255, 00.3)',
      border: '2px solid rgba(255, 255, 255, 0.55)',
    })
  ),
  transition('false <=> true', animate('300ms linear')),
]);

export const CollapseAnimationFade: AnimationTriggerMetadata = trigger(
  'fadeInOut',
  [
    state(
      'false',
      style({
        height: '0px',
        fontSize: '0',
        padding: '0',
        margin: '0',
      })
    ),
    state(
      'true',
      style({
        height: '*',
        fontSize: '*',
        padding: '*',
      })
    ),
    transition('true <=> false', [animate('200ms linear')]),
  ]
);

export const removeText: AnimationTriggerMetadata = trigger(
  'removeText',
  [
    state(
      'false',
      style({
        fontSize: '0',
      })
    ),
    state(
      'true',
      style({
        fontSize: '*',
      })
    ),
    transition('true <=> false', [animate('200ms linear')]),
  ]
);