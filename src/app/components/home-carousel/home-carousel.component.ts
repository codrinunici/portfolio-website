import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DatabaseService} from '../../api/database.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit, OnDestroy {

  testImage: any = [];
  private destroy$: Subject<boolean>;

  constructor(private database: DatabaseService) {
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.database.getCarousel().subscribe(data => {
      data.map(url => this.testImage.push(url));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
