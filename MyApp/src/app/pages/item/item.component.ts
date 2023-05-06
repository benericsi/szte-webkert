import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { GalleryService } from '../../shared/services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { Cart } from '../../shared/models/Cart';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
  
export class ItemComponent implements OnInit{

  userId: string = '';
  product!: Product;
  productObject!: Array<Product>;
  productId!: string;
  cartItem$?: Observable<Cart[]> | null;
  productsInCart: Set<string> = new Set();

  constructor(private route: ActivatedRoute, private galleryService: GalleryService, private cartService: CartService, private authF: AngularFireAuth, private afs: AngularFirestore) { }
  
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
    console.log(this.productId);
    
    this.authF.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.updateProductIdsInCart();
      }
    });

  this.galleryService.loadImageMeta('').subscribe((data: Array<Product>) => { 
    this.productObject = data;
    this.product = this.productObject.find(prod => prod.id === this.productId)!;
  });
  } 
  
  updateProductIdsInCart(): void {
    if (!this.userId) {
      this.productsInCart.clear();
      this.cartItem$ = null;
      return;
    }

    this.cartItem$ = this.afs.collection<Cart>('Carts', ref => {
      return ref.where('userId', '==', this.userId);
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Cart;
          return { ...data };
        });
      })
    );

    this.cartItem$.subscribe((cartItem) => {
      this.productsInCart.clear();
      cartItem.forEach((cartItem) => {
        this.productsInCart.add(cartItem.productId);
      });
    });
  }
  
  isProductInCart(productId: string): boolean {
    return this.productsInCart.has(productId);
  }


  toCart(product: Product) {
    if (this.isProductInCart(product.id)) {
      alert("Termék már szerepel a kosárban!");
    } else { 
      this.cartService.addToCart(this.userId, product);
      alert("Termék a kosárba került!");
    }
  }

}
