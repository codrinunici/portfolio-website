import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DatabaseService} from '../../api/database.service';
import {map} from "rxjs/operators";

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
    name_large: string;
    url_large: string;
    name_medium: string;
    url_medium: string;
    name_small: string;
    url_small: string;
  }] = [{name_large: '', url_large: '', name_medium: '', url_medium: '', name_small: '', url_small: ''}];


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


  async updateImages() {
    let imageFullLg: [{
      name: string,
      url: string
    }] = [{name: '', url: ''}];
    let imageFullMd: [{
      name: string,
      url: string
    }] = [{name: '', url: ''}];
    let imageFullSm: [{
      name: string,
      url: string
    }] = [{name: '', url: ''}];

    this.imageThumbnails = await this.database.linksGetter('/portfolio-pages/tragedy/thumbnails');
    imageFullLg = await this.database.linksGetter('/portfolio-pages/tragedy/full-size/large');
    imageFullMd = await this.database.linksGetter('/portfolio-pages/tragedy/full-size/medium');
    imageFullSm = await this.database.linksGetter('/portfolio-pages/tragedy/full-size/small');
    imageFullLg.forEach((item, i) => {
      this.imageFull.push(
        {
          name_large: item['name'], url_large: item['url'],
          name_medium: imageFullMd[i]['name'], url_medium: imageFullMd[i]['url'],
          name_small: imageFullSm[i]['name'], url_small: imageFullSm[i]['url']
        });
    });
    this.imageFull.shift();
    this.imageThumbnails.forEach((item, index) => {
      this.bothImageLinks.push({
        thumbnail: item['name'],
        thumbnailUrl: item['url'],
        fullSizeLarge: this.imageFull[index]['name_large'],
        fullSizeMedium: this.imageFull[index]['name_medium'],
        fullSizeSmall: this.imageFull[index]['name_small'],
        fullSizeUrlLarge: this.imageFull[index]['url_large'],
        fullSizeUrlMedium: this.imageFull[index]['url_medium'],
        fullSizeUrlSmall: this.imageFull[index]['url_small'],
      });
    });
    this.imageFull = [{name_large: '', url_large: '', name_medium: '', url_medium: '', name_small: '', url_small: ''}];
    this.imageThumbnails = [{
      name: '',
      url: ''
    }];
    this.bothImageLinks.shift();
    if (this.bothImageLinks.length > 1) {
      this.database.addImages(this.bothImageLinks, 'tragedy');
    }
    this.bothImageLinks = [{}];
  }
}
