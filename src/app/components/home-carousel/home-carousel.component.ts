import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DatabaseService} from '../../api/database.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit, OnDestroy {

  carouselImages: any = [];
  private destroy$: Subject<boolean>;
  showImages = false;
  showSpinner = true;
  private imgLoadedCount = 0;

  constructor(private database: DatabaseService) {
  }

  ngOnInit(): void {
    let path = 'carousel'
    this.destroy$ = new Subject<boolean>();
    if (window.innerWidth < window.innerHeight) {
      path = path + 'phone';
    } else if (window.outerWidth > 2160) {
      path = path + '2k4k';
    }
    console.log(path);
    this.database.getFromFirestore(path).pipe(takeUntil(this.destroy$)).subscribe(data => {
      data.map(url => this.carouselImages.push(url));
      this.showImages = true;
    });
  }

  spinnerDissapears() {
    this.imgLoadedCount++;
    if (this.imgLoadedCount === this.carouselImages.length - 1) {
      this.showSpinner = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
