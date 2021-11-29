import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc, where } from '@firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  news$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private firestore: Firestore
  ) { }

    getNews() {
      const newsRef = collection(this.firestore, 'news');
      collectionData(newsRef, { idField: 'id' }).subscribe(res => {
        let data: any[] = []
        res.forEach((element: any) => {
          if (element.status) {
            data.push(element);
          }
        })
        this.news$.next(data);
      });
    }

    getNewsById(id): Observable<any> {
      const newsDocRef = doc(this.firestore, `news/${id}`);
      return docData(newsDocRef, { idField: 'id' }) as Observable<any>;
    }
   
    addNews(element: any) {
      const newsRef = collection(this.firestore, 'news');
      return addDoc(newsRef, element);
    }
   
    deleteNews(element: any) {
      const newsDocRef = doc(this.firestore, `news/${element.id}`);
      return deleteDoc(newsDocRef);
    }
   
    updateNews(element: any) {
      const newsDocRef = doc(this.firestore, 'news/' + element.id);
      return updateDoc(newsDocRef, element);
    }
}