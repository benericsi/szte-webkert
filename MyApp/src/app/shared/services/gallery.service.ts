import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/Product';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  collectionName = 'Products';
  private defaultOrder: string = 'nameAsc';
  private productsCollection!: AngularFirestoreCollection<Product>;

  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { 
    this.productsCollection = afs.collection<Product>(this.collectionName);
  }
  

  /*
  loadImageMeta(metaUrl: string): Observable<Array<Product>>{ 
    return this.http.get('http://localhost:4200/assets/' + metaUrl) as Observable<Array<Product>>;
  }
  */

  loadImageMeta(metaUrl: string): Observable<Array<Product>>{ 
    return this.afs.collection<Product>(this.collectionName).valueChanges();
    //return this.http.get('http://localhost:4200/assets/' + metaUrl) as Observable<Array<Product>>;
  }

  loadImage(imageUrl: string) { 
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  getItemsOrderByTitleAsc(metaUrl: string): Observable<Array<Product>> {  
    return this.afs.collection<Product>(this.collectionName, ref => ref.orderBy('title')).valueChanges();
  }

  getItemsOrderByTitleDesc(metaUrl: string): Observable<Array<Product>> {  
    return this.afs.collection<Product>(this.collectionName, ref => ref.orderBy('title', 'desc')).valueChanges();
  }

  getItemsOrderByPriceAsc(metaUrl: string): Observable<Array<Product>> {  
    return this.afs.collection<Product>(this.collectionName, ref => ref.orderBy('price')).valueChanges();
  }

  getItemsOrderByPriceDesc(metaUrl: string): Observable<Array<Product>> {  
    return this.afs.collection<Product>(this.collectionName, ref => ref.orderBy('price', 'desc')).valueChanges();
  }

  getItemsOrderByVolumeTopThree(metaUrl: string): Observable<Array<Product>> {  
    return this.afs.collection<Product>(this.collectionName, ref => ref.orderBy('volume', 'desc').limit(3)).valueChanges();
  }

}
