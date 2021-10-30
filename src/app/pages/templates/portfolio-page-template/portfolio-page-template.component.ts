import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {DatabaseService} from '../../../api/database.service';
import {takeUntil} from 'rxjs/operators';
import {GoogleAnalyticsService} from '../../../api/google-analytics.service';
import $ from 'jquery';

declare var $: $;

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
  descriptionPath = '';
  @Input()
  backgroundImage = '';

  private wereOnPhone = false;
  images = [];
  seriesText: any;
  chosenImage: any = '';
  showSpinner = true;
  showImages = false;
  fullImageSize = '';
  fullImageIndex = -1;
  showSlideshowSpinner = false;

  constructor(private database: DatabaseService, private analytics: GoogleAnalyticsService) {
  }

  ngOnInit() {
    if (window.innerWidth > 2160) {
      this.imagesPath = this.imagesPath + '2k4k';
      this.fullImageSize = '4000w';
    } else {
      this.fullImageSize = '2000w';
    }
    this.destroy$ = new Subject<boolean>();

    if (window.outerWidth < 768) {
      this.wereOnPhone = true;
    }

    this.database.getFromFirestore(this.descriptionPath).pipe(takeUntil(this.destroy$)).subscribe(data => {
      // @ts-ignore
      data.map(text => this.seriesText = text.text);
    });
    this.database.getFromFirestore(this.imagesPath).pipe(takeUntil(this.destroy$)).subscribe(data => {
      data.map(url => this.images.push({...(url as object), loaded: false}));
      this.showImages = true;
    });
    if (window.innerWidth > window.innerHeight) {
      fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
        .subscribe((e: Event) => {
          const scrolltotop = document.scrollingElement.scrollTop;
          const target = document.getElementById('page-content');
          const xvalue = 'center';
          const factor = 0.63;
          const yvalue = scrolltotop * factor;
          target.style.backgroundPosition = xvalue + ' ' + yvalue + 'px';
        });
    }
  }

  setImageType(projectsImage: any) {
    const fullImage = document.getElementById('currentFullSizeImg') as HTMLImageElement;
    fullImage.className = '';
    if (fullImage.width > fullImage.height) {
      fullImage.className = 'landscape';
    } else {
      fullImage.className = 'portrait';
    }
    projectsImage.loaded = true;
    this.showSlideshowSpinner = false;
  }

  getNextPicture(factor: number) {
    this.fullImageIndex += factor;
    if (!this.images[this.fullImageIndex].loaded) {
      this.showSlideshowSpinner = true;
    }
  }

  selectFullSizeImage(projectsImageIndex: any) {
    if (!this.wereOnPhone) {
      this.fullImageIndex = projectsImageIndex;
    }
    if (!this.images[projectsImageIndex].loaded) {
      this.showSlideshowSpinner = true;
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
      document.getElementById('page-content').style.position = 'static';
      document.getElementById('page-content').style.overflow = 'visible';
    });
  }

  spinnerDissapears() {
    this.imgLoadedCount++;
    document.getElementById('page-content').style.position = 'fixed';
    document.getElementById('page-content').style.overflow = 'hidden';
    if (!this.wereOnPhone && this.imgLoadedCount === this.images.length) {
      this.loadBackground();
    }
    if (this.wereOnPhone && this.imgLoadedCount === this.images.length) {
      this.showSpinner = false;
      document.getElementById('page-content').style.position = 'static';
      document.getElementById('page-content').style.overflow = 'visible';
    }
    if (this.imgLoadedCount === this.images.length + 1) {
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
