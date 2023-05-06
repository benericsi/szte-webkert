import { Injectable, ViewChild } from '@angular/core';
import { Cart } from '../models/Cart';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Product } from '../models/Product';
import { Observable, forkJoin, retry, switchMap } from 'rxjs';
import { ItemComponent } from '../../pages/item/item.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  collectionName = "Carts";
  private cartCollection?: AngularFirestoreCollection<Cart>;

  constructor(private afs: AngularFirestore) {
    this.cartCollection = afs.collection<Cart>(this.collectionName);
  }

  addToCart(userId: string, product: Product) {
    const cartItem: Cart = {
      id: this.afs.createId(),
      userId: userId,
      productId: product.id,
      productTitle: product.title,
      productImg: product.img,
      productPrice: product.price,
      sum: 0,
      quantity: 0
    };

    const cartItemsCollection = this.afs.collection<Cart>('Carts');
    const query = cartItemsCollection.ref.where('userId', '==', userId).where('productId', '==', product.id);
    query.get().then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        const cartItemDoc = querySnapshot.docs[0];
        const existingCartItem = cartItemDoc.data() as Cart;
        existingCartItem.quantity += 1;
        existingCartItem.sum = product.price * existingCartItem.quantity;
        cartItemDoc.ref.update(existingCartItem);
      } else {
        cartItemsCollection.add(cartItem);
      }
    });

    return this.afs.collection<Cart>(this.collectionName).add(cartItem);
  }

  getCartItemsForUser(userId: string): Observable<Array<Cart>> {
  return this.afs.collection<Cart>(this.collectionName, ref => ref.where('userId', '==', userId))
    .valueChanges();
  }

  updateCartQuantity(userId: string, cartItem: Cart, newQuantity: number) {
    const cartItemDoc = this.afs.collection<Cart>(this.collectionName, ref => ref.where('userId', '==', userId).where('id', '==', cartItem.id));
    cartItemDoc.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          quantity: newQuantity,
          sum: newQuantity * cartItem.productPrice
        });
      });
    });
  }

  removeFromCart(uid: string, pid: string) { 
    return this.afs.collection<Cart>(this.collectionName, ref => 
    ref.where('userId', '==', uid).where('productId', '==', pid))
    .get()
    .subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }


}
