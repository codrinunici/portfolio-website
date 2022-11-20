import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private afs: AngularFirestore) {
  }

  sendContactInfo(data: any) {
    return this.afs.collection('contact').add(data);
  }

  getFromFirestore(path: string) {
    return this.afs.collection(path).valueChanges().pipe(debounceTime(2000));
  }

}



