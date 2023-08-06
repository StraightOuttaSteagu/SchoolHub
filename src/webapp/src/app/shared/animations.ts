import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const SwitchAnimation: AnimationTriggerMetadata = trigger('status', [
  state(
    'true',
    style({
      color: '#D9D9D9',
      backgroundColor: '#292251',
      border: 'none',
    })
  ),
  state(
    'false',
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
        fontSize: '20px',
        padding: '10px',
      })
    ),
    transition('true <=> false', [animate('200ms linear')]),
  ]
);
