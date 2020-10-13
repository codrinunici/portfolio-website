import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-homage',
  templateUrl: './homage.component.html',
  styleUrls: ['./homage.component.css']
})
export class HomageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean>;

  // inputs

  imagesPath = 'homage';
  seriesText = 'test';
  backgroundImage = '../../../../assets/background-homage.jpg';

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
