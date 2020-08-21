import {trigger, transition, style, query, animate} from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transition: ' 1s fade-out',
        }),
      ]),
      // Animate the new page in
      query(':enter', [
        animate('1s ease', style({opacity: 1, transition: 'fade-in'}))
      ])
    ]),
  ]);
