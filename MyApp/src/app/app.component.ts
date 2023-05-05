import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MyApp';
  page = 'home';
  loggedInUser?: firebase.default.User | null;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService
  ) { 
    this.matIconRegistry.addSvgIcon(
      'profile',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/user-solid.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'heart',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/heart-solid.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'cart',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/cart-shopping-solid.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'hamburger',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/bars-solid.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/facebook.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/instagram.svg')
    )
    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/right-from-bracket-solid.svg')
    )
  }

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(user => { 
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => { 
      localStorage.setItem('user', JSON.stringify('null'));
      console.error(error);
    })
  }
}


