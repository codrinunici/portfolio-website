import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore, private ads: AngularFireStorage) {
  }

  getSeries(path: string) {
    return this.afs.collection(path).valueChanges();
  }

  getCarousel() {
    return this.afs.collection('/carousel').valueChanges();
  }

  getSeriesThumbnails() {
    return this.afs.collection('/series-thumbnails').valueChanges();
  }

  getImageLinks(path: string) {
    const ref = this.ads.ref(path);
    return ref.listAll();
  }

  addImages(data: any, path: string) {
    data.forEach(links => {
      if (links['url'] != '') {
        this.afs.collection(path).add(links);
      }
    });

  }
}



