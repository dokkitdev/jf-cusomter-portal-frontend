import { trigger, style, animate, transition } from '@angular/animations';

export const heightCollapseAnimation = trigger('heightCollapse', [
  transition(':enter', [
    style({ height: '0px', opacity: 0 }),
    animate('0.2s ease-out', style({ height: '*', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    animate('0.2s ease-in', style({ height: '0px', opacity: 0 }))
  ])
]);
