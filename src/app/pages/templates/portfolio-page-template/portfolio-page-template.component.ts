import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {DatabaseService} from '../../../api/database.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-page-template',
  templateUrl: './portfolio-page-template.component.html',
  styleUrls: ['./portfolio-page-template.component.scss']
})
export class PortfolioPageTemplateComponent implements OnInit, OnDestroy {

  imgLoadedCount = 0;
  destroy$: Subject<boolean>;

  @Input()
  imagesPath = '';
  @Input()
  seriesText = '';
  @Input()
  backgroundImage = '';

  images = [];
  chosenImage: any = '';
  showSpinner = true;
  showImages = false;
  fullImageSize = '';
  constructor(private database: DatabaseService) {
  }

  ngOnInit() {
    if (window.innerWidth > 2160) {
      this.imagesPath = this.imagesPath + '2k4k';
      this.fullImageSize = '4000w';
    }
    else{
      this.fullImageSize = '2000w';
    }
    this.destroy$ = new Subject<boolean>();
    this.database.getImages(this.imagesPath).pipe(takeUntil(this.destroy$)).subscribe(data => {
      data.map(url => this.images.push(url));
      this.showImages = true;
    });

    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => {
        const scrolltotop = document.scrollingElement.scrollTop;
        const target = document.getElementById('page-content');
        const xvalue = 'center';
        const factor = 0.83166;
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

  spinnerDissapears() {
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
