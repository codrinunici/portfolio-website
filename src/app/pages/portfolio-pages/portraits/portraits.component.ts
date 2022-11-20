import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-portraits',
  templateUrl: './portraits.component.html',
  styleUrls: ['./portraits.component.scss']
})
export class PortraitsComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean>;

  // inputs
  imagesPath = 'portraits';
  backgroundImage = '../../../../assets/background-portraits.jpg';

  constructor() {
  }

  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
