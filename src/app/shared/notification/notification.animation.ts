import { animate, state, style, transition, trigger } from '@angular/animations';

export const notificationAnimation = [
  trigger('flyInOut', [
    state('inactive', style({ height: 0, paddingTop: 0, paddingBottom: 0 })),
    state('active', style({ height: '*', paddingTop: '*', paddingBottom: '*' })),
    state('removed', style({ height: 0, paddingTop: 0, paddingBottom: 0 })),
    transition('inactive => active', animate('300ms ease-in-out')),
    transition('active => removed', animate('300ms ease-in-out'))
  ])
];
