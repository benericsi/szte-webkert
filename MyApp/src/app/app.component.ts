import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyApp';
  page = 'home';


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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

  }
}
