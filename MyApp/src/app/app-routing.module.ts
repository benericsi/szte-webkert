import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ItemComponent } from './pages/item/item.component';

const routes: Routes = [
  {
    path: '#forms',
    component: HomeComponent
  },
  {
    path: '#welcome_sect',
    component: HomeComponent
  },
  {
  path: 'item/:productId',
  component: ItemComponent
},
  {
  path: 'home',
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  
  },
  {
  path: 'gallery',
  loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule),
   canActivate: [AuthGuard]
  },
  {
  path: 'item',
  loadChildren: () => import('./pages/item/item.module').then(m => m.ItemModule),
  canActivate: [AuthGuard]
  },
  {
  path: 'favourites',
  loadChildren: () => import('./pages/favourites/favourites.module').then(m => m.FavouritesModule),
  canActivate: [AuthGuard]
  },
  {
  path: 'contact',
  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
  path: 'not-found',
  loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
