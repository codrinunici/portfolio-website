import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseService} from '../../../api/database.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-tragedy',
  templateUrl: './tragedy.component.html',
  styleUrls: ['./tragedy.component.scss']
})
export class TragedyComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean>;

  // inputs
  imagesPath = 'tragedy';
  descriptionPath = 'tragedydesc';
  backgroundImage = '../../../../assets/background-tragedy.jpg';

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
