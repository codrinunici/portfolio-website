import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {DatabaseService} from '../../api/database.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit, OnDestroy {
  private imagesInfo: [{
    name: string;
    url_large: string;
    url_medium: string;
  }] = [{name: '', url_large: '', url_medium: ''}];
  public $destroy: Subject<boolean>;
  imagesPath = 'series-thumbnails';
  backgroundImage = '../../assets/background-series.jpg';

  constructor(private database: DatabaseService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.unsubscribe();
  }


  async updateImages() {
    let imageFullLg: [{
      name: string,
      url: string
    }];
    let imageFullMd: [{
      name: string,
      url: string
    }] = [{name: '', url: ''}];
    imageFullLg = await this.database.linksGetter('/portfolio-pages/events/large2k4k');
    imageFullMd = await this.database.linksGetter('/portfolio-pages/events/medium2k4k');
    console.log(imageFullMd)
    console.log(imageFullLg)
    imageFullLg.forEach((item, i) => {
      this.imagesInfo.push(
        {
          name: item['name'], url_large: item['url'], url_medium: imageFullMd[i]['url'],
        });
    });
    this.imagesInfo.shift();
    if (this.imagesInfo.length > 1) {
      this.database.addImages(this.imagesInfo, 'events2k4k');
    }
    this.imagesInfo = [{name: '', url_large: '', url_medium: ''}];
  }
}
