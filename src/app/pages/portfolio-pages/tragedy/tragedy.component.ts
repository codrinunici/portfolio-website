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
  seriesText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut sem viverra aliquet eget sit. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Scelerisque purus semper eget duis at tellus at urna. At consectetur lorem donec massa sapien faucibus. Eu sem integer vitae justo eget magna fermentum.';
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
