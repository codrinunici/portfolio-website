import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DatabaseService} from '../../api/database.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit, OnDestroy {
  showSpinner = true;
  private imageThumbnails: [{
    name: string;
    url: string;
  }] = [{name: '', url: ''}];
  private imageFull: [{
    name: string;
    url: string;
  }] = [{name: '', url: ''}];

  private bothImageLinks = [{}];
  public $destroy: Subject<boolean>;
  seriesThumbnails = [];

  constructor(private database: DatabaseService) {

  }

  ngOnInit(): void {
    this.$destroy = new Subject<boolean>();
    this.database.getSeriesThumbnails().subscribe(data => {
      data.map(url => this.seriesThumbnails.push(url));
      this.showSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }

  updateImages() {
    this.database.getImageLinks('/portfolio-pages/tragedy/thumbnails')
      .subscribe(imageEntry => imageEntry.items
        .map(url => url.getDownloadURL()
          .then(downloadUrl => this.imageThumbnails.push({url: downloadUrl, name: url.name}))));
    this.imageThumbnails.shift();
    this.imageThumbnails.sort((a, b) => a.name > b.name ? 1 : -1);

    this.database.getImageLinks('/portfolio-pages/tragedy/full-size')
      .subscribe(imageEntry => imageEntry.items
        .map(url => url.getDownloadURL()
          .then(downloadUrl => this.imageFull.push({url: downloadUrl, name: url.name}))));
    this.imageFull.shift();
    this.imageFull.sort((a, b) => a.name > b.name ? 1 : -1);
    //

    this.imageThumbnails.forEach((item, index) => {
      this.bothImageLinks.push({thumbnail: item['url'], fullsize: this.imageFull[index]['url']});
    });
    this.imageFull = [{name: '', url: ''}];
    this.imageThumbnails = [{name: '', url: ''}];
    if (this.bothImageLinks.length > 1) {
      this.database.addImages(this.bothImageLinks, 'tragedy');
    }
    this.bothImageLinks = [{}];
  }
}
