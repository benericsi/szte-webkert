import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    FavouritesComponent
  ],
  imports: [
    CommonModule,
    FavouritesRoutingModule,
    MatExpansionModule,
    MatButtonModule
  ]
})
export class FavouritesModule { }
