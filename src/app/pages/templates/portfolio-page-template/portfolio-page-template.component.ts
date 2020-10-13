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

  constructor(private database: DatabaseService) {
  }
  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.database.getSeries(this.imagesPath).pipe(takeUntil(this.destroy$)).subscribe(data => {
      data.map(url => this.images.push(url));
      this.showImages = true;
    });
    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => {
        const scrolltotop = document.scrollingElement.scrollTop;
        const target = document.getElementById('page-content');
        const xvalue = 'center';
        const factor = 0.83156;
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
