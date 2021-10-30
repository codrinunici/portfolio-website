import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {DatabaseService} from '../../../api/database.service';
import {takeUntil} from 'rxjs/operators';
import {GoogleAnalyticsService} from '../../../api/google-analytics.service';

@Component({
  selector: 'app-collection-selection-template',
  templateUrl: './collection-selection-template.component.html',
  styleUrls: ['./collection-selection-template.component.scss']
})
export class CollectionSelectionTemplateComponent implements OnInit, OnDestroy {
  showImages = false;
  showSpinner = true;
  private imgLoadedCount = 0;
  private $destroy: Subject<boolean>;
  images = [];
  wereOnPhone = false;

  @Input()
  imagesPath = '';
  @Input()
  backgroundImage = '';

  constructor(private database: DatabaseService, private analytics: GoogleAnalyticsService) {
  }

  ngOnInit(): void {
    if (window.innerWidth > 2160)
      this.imagesPath = this.imagesPath + '2k4k';
    this.$destroy = new Subject<boolean>();
    this.database.getFromFirestore(this.imagesPath).pipe(takeUntil(this.$destroy)).subscribe(data => {
      this.images = data;
      this.showImages = true;
    });
    let factor = 0;
    if (window.innerWidth < window.innerHeight) {
      this.wereOnPhone = true;
      factor = 0.23;
    } else {
      factor = 0.53;
    }
    if (this.wereOnPhone) {
      fromEvent(window, 'scroll').pipe(takeUntil(this.$destroy))
        .subscribe((e: Event) => {
          const scrolltotop = document.scrollingElement.scrollTop;
          const target = document.getElementById('page-content');
          const xvalue = 'center';
          const yvalue = scrolltotop * factor;
          target.style.backgroundPosition = xvalue + ' ' + yvalue + 'px';
        });
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
    console.log(this.imgLoadedCount)
    if (this.imgLoadedCount === this.images.length + 1) {
      this.showSpinner = false;
    }
    if (this.imgLoadedCount === this.images.length) {
      this.loadBackground();
    }
  }

  logCollectionOption(thumbnail: string) {
    this.analytics.eventEmitter(thumbnail +
      '_collection_click', 'series_click', 'click');
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }

}
