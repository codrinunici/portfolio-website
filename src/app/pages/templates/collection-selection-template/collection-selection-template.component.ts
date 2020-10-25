import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject} from "rxjs";
import {DatabaseService} from '../../../api/database.service';
import {takeUntil} from "rxjs/operators";

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
  seriesThumbnails = [];
  wereOnPhone = false;

  @Input()
  imagesPath = '';
  @Input()
  backgroundImage = '';

  constructor(private database: DatabaseService) {
  }

  ngOnInit(): void {
    if (window.innerWidth > 2160)
      this.imagesPath = this.imagesPath + '2k4k';
    this.$destroy = new Subject<boolean>();
    this.database.getFromFirestore(this.imagesPath).pipe(takeUntil(this.$destroy)).subscribe(data => {
      data.map(url => this.seriesThumbnails.push(url));
      this.showImages = true;
    });
    if (window.innerWidth < window.innerHeight) {
      this.wereOnPhone = true;
    }
    fromEvent(window, 'scroll').pipe(takeUntil(this.$destroy))
      .subscribe((e: Event) => {
        const scrolltotop = document.scrollingElement.scrollTop;
        const target = document.getElementById('page-content');
        const xvalue = 'center';
        const factor = 0.8316;
        const yvalue = scrolltotop * factor;
        target.style.backgroundPosition = xvalue + ' ' + yvalue + 'px';
      });
  }

  spinnerDissapears() {
    this.imgLoadedCount++;
    if (this.imgLoadedCount === this.seriesThumbnails.length - 1) {
      this.showSpinner = false;
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }

}
