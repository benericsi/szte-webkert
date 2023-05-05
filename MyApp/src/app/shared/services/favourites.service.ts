import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WishlistItem } from '../models/WishlistItem';
import { User } from '../models/User';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  collectionName = "Wishlists";
  private wishlistCollection?: AngularFirestoreCollection<WishlistItem>;

  constructor(private afs: AngularFirestore) {
    this.wishlistCollection = afs.collection<WishlistItem>(this.collectionName);
  }

  addToWishlist(userId: string, product: Product) {
    const wishlistItem: WishlistItem = {
      id: this.afs.createId(),
      userId: userId,
      productId: product.id,
      productTitle: product.title,
      productImg: product.img,
      productPrice: product.price
    };

    return this.afs.collection<WishlistItem>(this.collectionName).add(wishlistItem);
  }

  getWishlistItemsForUser(userId: string): Observable<Array<WishlistItem>> {
  return this.afs.collection<WishlistItem>(this.collectionName, ref => ref.where('userId', '==', userId))
    .valueChanges();
  }

  removeFromWishlist(uid: string, pid: string) { 
    return this.afs.collection<WishlistItem>(this.collectionName, ref => 
    ref.where('userId', '==', uid).where('productId', '==', pid))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }
  
}
