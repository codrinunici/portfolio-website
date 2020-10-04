import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseService} from '../../../api/database.service';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-tragedy',
  templateUrl: './tragedy.component.html',
  styleUrls: ['./tragedy.component.scss']
})
export class TragedyComponent implements OnInit, OnDestroy {
  imgLoadedCount = 0;
  destroy$: Subject<boolean>;
  images = [];
  chosenImage: any = '';
  showSpinner = true;
  showImages = false;

  constructor(private database: DatabaseService) {
  }


  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.database.getSeries('tragedy').pipe(takeUntil(this.destroy$)).subscribe(data => {
      data.map(url => this.images.push(url));
      this.showImages = true;
    });

    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => {
        const scrolltotop = document.scrollingElement.scrollTop;
        const target = document.getElementById('page-content');
        const xvalue = 'center';
        const factor = 0.73156;
        const yvalue = scrolltotop * factor;
        target.style.backgroundPosition = xvalue + ' ' + yvalue + 'px';
      });
  }

  setFullSizeDynamically(tragedyImage: any) {
    if (window.innerWidth < 768) {
      this.chosenImage = '';
    } else {
      this.chosenImage = tragedyImage;
    }

  }

  test() {
    console.log(this.imgLoadedCount);
    this.imgLoadedCount++;
    if (this.imgLoadedCount === this.images.length - 1) {
      this.showSpinner = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
