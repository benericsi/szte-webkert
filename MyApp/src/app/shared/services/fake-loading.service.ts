import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  loadingWithPromise(): Promise<number>{ 

    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 1) {
          clearInterval(interval);
          resolve(i);
        }
      }, 250)
    })
  }
  /*
  loadingWithObservable(email: string, password: string, firstname: string, lastname:string, rePassword: string): Observable<number> { 
    return new Observable((subscriber: Subscriber<number>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        subscriber.next(i);
        if (i === 1) {
          clearInterval(interval);
          subscriber.complete();
        }
      }, 1000)
    });
  }
  */
}
