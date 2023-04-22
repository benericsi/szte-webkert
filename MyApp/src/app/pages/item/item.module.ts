import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class ItemModule { }
