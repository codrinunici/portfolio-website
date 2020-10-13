import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {DatabaseService} from '../../../api/database.service';

@Component({
  selector: 'app-collection-selection-template',
  templateUrl: './collection-selection-template.component.html',
  styleUrls: ['./collection-selection-template.component.scss']
})
export class CollectionSelectionTemplateComponent implements OnInit, OnDestroy {

  showImages = false;
  showSpinner = true;
  private imgLoadedCount = 0;
  public $destroy: Subject<boolean>;
  seriesThumbnails = [];

  @Input()
  imagesPath = '';
  @Input()
  backgroundImage = '';

  constructor(private database: DatabaseService) {
  }

  ngOnInit(): void {
    this.$destroy = new Subject<boolean>();
    this.database.getSeriesThumbnails().subscribe(data => {
      data.map(url => this.seriesThumbnails.push(url));
      this.showImages = true;
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
