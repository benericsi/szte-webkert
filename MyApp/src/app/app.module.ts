import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HomeComponent } from './pages/home/home.component';
//import { GalleryComponent } from './pages/gallery/gallery.component';
//import { ItemComponent } from './pages/item/item.component';
//import { ContactComponent } from './pages/contact/contact.component';
//import { AdminComponent } from './pages/admin/admin.component';
import { MenuComponent } from './shared/menu/menu.component';
//import { FavouritesComponent } from './pages/favourites/favourites.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
    //HomeComponent,
    //GalleryComponent,
    //ItemComponent,
    //ContactComponent,
    //AdminComponent,
    //FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
