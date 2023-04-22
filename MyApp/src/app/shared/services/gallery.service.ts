import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {



  constructor(private http: HttpClient) { }
  
  loadImageMeta(metaUrl: string): Observable<Array<Product>>{ 
    return this.http.get('http://localhost:4200/assets/' + metaUrl) as Observable<Array<Product>>;
  }
}
