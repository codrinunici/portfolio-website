import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-last-night',
  templateUrl: './last-night.component.html',
  styleUrls: ['./last-night.component.scss']
})
export class LastNightComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean>;

  imagesPath = 'last-night';
  descriptionPath = 'lastnightdesc';
  backgroundImage = '../../../../assets/background-lastnight.jpg';

  constructor() { }

  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
