import { Component, OnInit, ViewChild } from '@angular/core';
import { WishlistItem } from '../../shared/models/WishlistItem';
import { FavouritesService } from '../../shared/services/favourites.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit{
  wishlist?: Array<WishlistItem>;
  userId: string = '';
  @ViewChild(GalleryComponent) galleryComponent!: GalleryComponent;

  constructor(private favouritesService: FavouritesService, private authF: AngularFireAuth) { 
    
  }

  ngOnInit(): void {
    this.authF.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
      this.favouritesService.getWishlistItemsForUser(this.userId).subscribe((data: Array<WishlistItem>) => { 
      this.wishlist = data;
    })
    });
  }

  removeFromList(userId: string, productId: string) { 
    this.favouritesService.removeFromWishlist(userId, productId)
  }
}
