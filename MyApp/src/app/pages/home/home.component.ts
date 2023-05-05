import { Component} from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { User } from '../../shared/models/User';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../shared/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component(
  {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
}
  
)
export class HomeComponent{

  constructor(private router: Router, private fb: FormBuilder, private loadingService: FakeLoadingService, private authService: AuthService) { }

  matcher = new MyErrorStateMatcher();

  loginForm = new FormGroup({
    login_email: new FormControl(''),
    login_pw: new FormControl('')
  })


  signupForm = this.createSignupForm({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  })

  createSignupForm(model: User) {
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.email]);
    formGroup.get('firstname')?.addValidators([Validators.required]);
    formGroup.get('lastname')?.addValidators([Validators.required]);
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(5)]);
    return formGroup;
  }

  
  
  onLogin() {
    /*
    this.loadingService.loadingWithPromise().then((data: number) => {
      if (data === 1) {
        if (this.loginForm.get('login_email')?.value === 'asd' && this.loginForm.get('login_pw')?.value === 'asd') {
          this.router.navigateByUrl('/home#welcome_sect');
          alert('Sikeres bejelentkezés!');
        } else {
          alert('Hibás bejelentkezési adatok!');
        }
      }
    }).catch(error => { 
      console.error(error);
    }).finally(() => { 
      console.log('Executed finally');
    });
    */
    
    this.authService.login(this.loginForm.get('login_email')?.value!, this.loginForm.get('login_pw')?.value!).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/home#welcome_sect');
      alert('Sikeres bejelentkezés!');
      
    }).catch(error => { 
      console.error(error);
      alert('Hibás bejelentkezési adatok!');
    });
  }
  
  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.get('email')?.value!, this.signupForm.get('password')?.value!).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/home#welcome_sect');
        alert('Sikeres regisztráció!');
      }).catch(error => { 
        console.log(error);
        alert('Hiba a regisztáció során!');
      });
    }
  }
  
  
}
