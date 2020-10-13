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
  imagesPath = 'tragedy';
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
    imageFullLg = await this.database.linksGetter('/portfolio-pages/homage/large');
    imageFullMd = await this.database.linksGetter('/portfolio-pages/homage/medium');
    imageFullLg.forEach((item, i) => {
      this.imagesInfo.push(
        {
          name: item['name'], url_large: item['url'], url_medium: imageFullMd[i]['url'],
        });
    });
    this.imagesInfo.shift();
    if (this.imagesInfo.length > 1) {
      this.database.addImages(this.imagesInfo, 'homage');
    }
    this.imagesInfo = [{name: '', url_large: '', url_medium: ''}];
  }
}
