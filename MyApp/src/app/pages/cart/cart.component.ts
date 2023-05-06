import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Observable } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ItemComponent } from '../item/item.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  userId: string = '';
  cart?: Array<Cart>;
  currentQuantity: number = 0;
  currentPrice: number = 0;

  constructor( private cartService: CartService, private authF: AngularFireAuth, private afs: AngularFirestore) {
   }

  ngOnInit(): void {
    this.authF.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      this.cartService.getCartItemsForUser(this.userId).subscribe((data: Array<Cart>) => {
        this.cart = data;
      });
    });
  
  }
  onQuantityChange(cartItem: Cart, newQuantity: number) {
    if (newQuantity >= 1) {
      cartItem.quantity = newQuantity;
      this.cartService.updateCartQuantity( this.userId, cartItem, newQuantity);
    } else { 
      cartItem.quantity = 1;
    }  
  }

  removeItemFromCart(cartItem: Cart) { 
    this.cartService.removeFromCart(this.userId, cartItem.id);
  }
  
}
