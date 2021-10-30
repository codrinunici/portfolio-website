import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {debounceTime} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore, private ads: AngularFireStorage) {
  }

  sendContactInfo(data: any) {
    return this.afs.collection('contact').add(data);
  }

  getFromFirestore(path: string) {
    return this.afs.collection(path).valueChanges().pipe(debounceTime(2000));
  }

  getImageLinks(path: string) {
    const ref = this.ads.ref(path);
    return ref.listAll();
  }

  async linksGetter(path: string) {
    const promisesSet = [];
    const urls = [];
    const finalUrls: [{
      name: string,
      url: string
    }] = [{name: '', url: ''}];
    const imageLinks = await this.getImageLinks(path).toPromise();
    imageLinks.items.forEach(item => {
      promisesSet.push(item.getDownloadURL());
      urls.push(item.name);
    });
    const snapshots = await Promise.all(promisesSet);
    snapshots.forEach((item, index) =>
      finalUrls.push({name: urls[index], url: item})
    );
    finalUrls.shift();
    finalUrls.sort((a, b) => a.name > b.name ? 1 : -1);
    return finalUrls;
  }

  addImages(data: any, path: string) {
    console.log(path)
    data.forEach(links => {
      this.afs.collection(path).add(links);
    });
  }



}



