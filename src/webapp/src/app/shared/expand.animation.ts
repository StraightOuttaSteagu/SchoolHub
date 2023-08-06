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
  transition('true <=> false', animate('300ms linear')),
]);

export const FormAnimationFade: AnimationTriggerMetadata = trigger(
  'fadeInOut',
  [
    state(
      'true',
      style({
        height: '0px',
        fontSize: '0',
        padding: '0',
        margin: '0',
      })
    ),
    state(
      'false',
      style({
        height: '*',
        fontSize: '20px',
        padding: '10px',
      })
    ),
    transition('false <=> true', [animate('200ms linear')]),
  ]
);

export const FormAnimationMargin: AnimationTriggerMetadata = trigger(
  'changeMargin',
  [
    state(
      'true',
      style({
        marginBottom: '0',
      })
    ),
    state(
      'false',
      style({
        marginBottom: '20px',
      })
    ),
    transition('false <=> true', [animate('300ms linear')]),
  ]
);