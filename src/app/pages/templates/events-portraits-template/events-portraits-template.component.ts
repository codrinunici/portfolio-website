import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from "rxjs";
import {DatabaseService} from "../../../api/database.service";
import {takeUntil} from "rxjs/operators";
import {GoogleAnalyticsService} from "../../../api/google-analytics.service";

@Component({
  selector: 'app-events-portraits-template',
  templateUrl: './events-portraits-template.component.html',
  styleUrls: ['./events-portraits-template.component.scss']
})
export class EventsPortraitsTemplateComponent implements OnInit, OnDestroy {


  private imgLoadedCount = 0;
  destroy$: Subject<boolean>;
  private wereOnPhone = false;

  @Input()
  imagesPath = '';
  @Input()
  backgroundImage = '';

  images = [];
  chosenImage: any = '';
  showSpinner = true;
  showImages = false;
  fullImageSize = '';

  constructor(private database: DatabaseService, private analytics:GoogleAnalyticsService) {
  }

  ngOnInit() {
    if (window.innerWidth > 2160) {
      this.imagesPath = this.imagesPath + '2k4k';
      this.fullImageSize = '4000w';

    } else {
      this.fullImageSize = '2000w';
    }
    if (window.outerWidth < 768) {
      this.wereOnPhone = true;
    }

    this.destroy$ = new Subject<boolean>();
    this.database.getFromFirestore(this.imagesPath).pipe(takeUntil(this.destroy$)).subscribe(data => {
      data.map(url => this.images.push(url));
      this.showImages = true;
    });
    if (window.innerWidth > window.innerHeight) {
      fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
        .subscribe((e: Event) => {
          const scrolltotop = document.scrollingElement.scrollTop;
          const target = document.getElementById('page-content');
          const xvalue = 'center';
          const factor = 0.53;
          const yvalue = scrolltotop * factor;
          target.style.backgroundPosition = xvalue + ' ' + yvalue + 'px';
        });
    }
  }

  setFullSizeDynamically(tragedyImage: any) {
    if (window.innerWidth < 768) {
      this.chosenImage = '';
    } else {
      this.chosenImage = tragedyImage;
    }

  }

  loadBackground() {
    const content = document.getElementById('page-content');
    let preloaderImg = document.createElement('img');
    preloaderImg.src = this.backgroundImage;

    preloaderImg.addEventListener('load', (event) => {
      content.style.backgroundImage = `url(${this.backgroundImage})`;
      preloaderImg = null;
      this.spinnerDissapears();
    });
  }

  spinnerDissapears() {
    this.imgLoadedCount++;
    if (!this.wereOnPhone && this.imgLoadedCount === this.images.length) {
      this.loadBackground();
      const content = document.getElementById('page-content');
      if (content.scrollHeight < window.outerHeight) {
        content.style.height = '125vh';
      }
    }
    if (this.imgLoadedCount === this.images.length + 1) {
      this.showSpinner = false;
    }
    if (this.wereOnPhone && this.imgLoadedCount === this.images.length) {
      this.showSpinner = false;
    }
  }

  logFullImageClick(portfolioImage: any) {
    this.analytics.eventEmitter(
      this.imagesPath + '_full_image_click', 'full_image_click', 'click', null, portfolioImage.name);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
