import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  isGalleryRoute: boolean = false;
  @Input() loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isGalleryRoute = ((event.url === '/gallery') || event.url.startsWith('/item') || event.url.startsWith('/favourites') || event.url.startsWith('/cart'));
      }
    });
   
  }

  logOut() { 
    this.authService.logout().then(() => { 
      alert('Sikeres kijelentkezés!');
    }).catch(error => { 
      console.log(error);
    });
  }

}
