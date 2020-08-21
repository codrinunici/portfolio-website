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
  images = [];
  chosenImage = '';
  showSpinner = true;

  constructor(private database: DatabaseService) {
  }


  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.database.getSeries('tragedy').subscribe(data =>  {
      data.map(url => this.images.push(url));
      this.showSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
