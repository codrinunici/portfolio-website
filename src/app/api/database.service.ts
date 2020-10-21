import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore, private ads: AngularFireStorage) {
  }

  getImages(path: string) {
    return this.afs.collection(path).valueChanges();
  }

  getImageLinks(path: string) {
    const ref = this.ads.ref(path);
    return ref.listAll();
  }

  async linksGetter(path: string) {
    const promisestest = [];
    const urls = [];
    const finalUrls: [{
      name: string,
      url: string
    }] = [{name: '', url: ''}];
    const test = await this.getImageLinks(path).toPromise();
    test.items.forEach(item => {
      promisestest.push(item.getDownloadURL());
      urls.push(item.name);
    });
    const snapshots = await Promise.all(promisestest);
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


  sendMeEmail(contactData: any) {
    console.log(contactData);
  }
}



