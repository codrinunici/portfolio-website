import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss'],
  animations: [trigger('fadeInAnimation', [
    transition(':enter', [
      style({opacity: 0}),
      animate('0.1s', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('0.4s', style({opacity: 0}))
    ])
  ])],
  host: {'[@fadeInAnimation]': ''}
})
export class LoadSpinnerComponent implements OnInit {

  constructor() {
    window.outerHeight.valueChanges.subscribe()
  }

  ngOnInit(): void {
  }

}
