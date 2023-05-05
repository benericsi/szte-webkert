import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/Product';
import { GalleryService } from '../../shared/services/gallery.service';
import { FavouritesService } from 'src/app/shared/services/favourites.service';
import { User } from '../../shared/models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WishlistItem } from 'src/app/shared/models/WishlistItem';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';




@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit{

  @Output() dataEvent = new EventEmitter<Product>();

  constructor(private router: Router, private galleryService: GalleryService, private favouritesService: FavouritesService, private authF: AngularFireAuth, private afs: AngularFirestore) { }
  userId: string = '';
  selected?: string = "nameAsc";
  productObject?: Array<Product>;
  chosenProduct?: Product;
  sum = 0;
  wishlistItems$?: Observable<WishlistItem[]> | null;
  productIdsInWishlist: Set<string> = new Set<string>();

  ngOnInit(): void {
     this.authF.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.updateProductIdsInWishlist();
      }
    });
    
    this.galleryService.getItemsOrderByTitleAsc('').subscribe((data: Array<Product>) => { 
      console.log(data);
      this.productObject = data;
      this.sum = this.productObject.length;
    })
  }

  updateProductIdsInWishlist(): void {
    if (!this.userId) {
      this.productIdsInWishlist.clear();
      this.wishlistItems$ = null;
      return;
    }

    this.wishlistItems$ = this.afs.collection<WishlistItem>('Wishlists', ref => {
      return ref.where('userId', '==', this.userId);
    }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as WishlistItem;
          return { ...data };
        });
      })
    );

    this.wishlistItems$.subscribe((wishlistItems) => {
      this.productIdsInWishlist.clear();
      wishlistItems.forEach((wishlistItem) => {
        this.productIdsInWishlist.add(wishlistItem.productId);
      });
    });
  }

  isProductInWishlist(productId: string): boolean {
    return this.productIdsInWishlist.has(productId);
  }

  toWishlist(userId: string, product: Product) { 
    if (this.isProductInWishlist(product.id)) {
      this.productIdsInWishlist.delete(product.id);
      alert("Termék lekerült a kedvencek közül!");
      this.favouritesService.removeFromWishlist(userId, product.id)
    } else { 
      this.favouritesService.addToWishlist(userId, product);
      alert("Termék a kedvencek közé került!");
    }
    
  }

  loadItem(product: Product) { 
    this.router.navigate([ '/item', { productId: product.id } ]);
  }

  onSelectChange(event: any) {
    this.selected = event;
    console.log(this.selected)

     switch (this.selected) {
    case 'nameAsc':
      this.galleryService.getItemsOrderByTitleAsc('').subscribe((data: Array<Product>) => { 
      console.log(data);
        this.productObject = data;
        this.sum = this.productObject.length;
    });
      break;
    case 'nameDesc':
      this.galleryService.getItemsOrderByTitleDesc('').subscribe((data: Array<Product>) => { 
      console.log(data);
        this.productObject = data;
        this.sum = this.productObject.length;
    });
      break;
    case 'priceAsc':
      this.galleryService.getItemsOrderByPriceAsc('').subscribe((data: Array<Product>) => { 
      console.log(data);
        this.productObject = data;
        this.sum = this.productObject.length;
    });
      break;
    case 'priceDesc':
      this.galleryService.getItemsOrderByPriceDesc('').subscribe((data: Array<Product>) => { 
      console.log(data);
        this.productObject = data;
        this.sum = this.productObject.length;
    });
         break;
       case 'top3vol':
      this.galleryService.getItemsOrderByVolumeTopThree('').subscribe((data: Array<Product>) => { 
      console.log(data);
        this.productObject = data;
        this.sum = this.productObject.length;
    });
      break;
    default:
      this.galleryService.getItemsOrderByTitleAsc('').subscribe((data: Array<Product>) => { 
      console.log(data);
        this.productObject = data;
        this.sum = this.productObject.length;
    });
  }
  }
 
  


  
  
  

}
