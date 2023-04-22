import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/Product';
import { GalleryService } from '../../shared/services/gallery.service';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit{

  constructor(private router: Router, private galleryService: GalleryService) { }

  selected = 'az';

  productObject?: Array<Product>;
  chosenProduct?: Product;
  sum = 0;

  ngOnInit(): void {
    this.galleryService.loadImageMeta('__credits.json').subscribe((data: Array<Product>) => { 
      console.log(data);
      this.productObject = data;
      this.productObject.forEach(value => { 
        this.sum++;
      })
    })
  }
  
  loadImage() { 
    return;
  }

  loadItem() { 
    this.router.navigate([ '/item' ])
  }



  
  
  

}
