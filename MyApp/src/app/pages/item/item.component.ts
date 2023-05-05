import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { GalleryService } from '../../shared/services/gallery.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  product!: Product;
  productObject!: Array<Product>;
  productId!: string;

  constructor(private route: ActivatedRoute, private galleryService: GalleryService) { }
  
  ngOnInit() {
  this.productId = this.route.snapshot.paramMap.get('productId')!;
  console.log(this.productId);

  this.galleryService.loadImageMeta('').subscribe((data: Array<Product>) => { 
    console.log(data);
    this.productObject = data;

    this.product = this.productObject.find(prod => prod.id === this.productId)!;
    console.log(this.product);
  });
}

}
