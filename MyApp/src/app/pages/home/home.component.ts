import { Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  

  constructor(private fb: FormBuilder) { }

  signupForm = this.createForm({
    email: '',
    name: {
      firstname: '',
      lastname: ''
    },
    password: '',
  })

  createForm(model: User) {
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators([Validators.required, Validators.email]);
    formGroup.get('firstname')?.addValidators([Validators.required]);
    formGroup.get('lastname')?.addValidators([Validators.required]);
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(5)]);
    formGroup.get('rePassword')?.addValidators([Validators.required]);
    return formGroup;
  }

  /*
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });
  */
  
  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.get('email')?.value);
    }
  }
  
  
}
