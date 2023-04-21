import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '#forms',
    component: HomeComponent
  },
  {
  path: 'home',
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
  path: 'gallery',
  loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
  path: 'item',
  loadChildren: () => import('./pages/item/item.module').then(m => m.ItemModule)
  },
  {
  path: 'favourites',
  loadChildren: () => import('./pages/favourites/favourites.module').then(m => m.FavouritesModule)
  },
  {
  path: 'contact',
  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
  path: 'admin',
  loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
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
