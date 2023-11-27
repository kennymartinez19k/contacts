import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  roles = [
    "Admin", "Usuario"
  ];
  formRegister: FormGroup;
    
    constructor(public authService: AuthService, private router: Router ) { 
    this.formRegister = new FormGroup({
      userRegistered: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      key: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      file: new FormControl(''),
    })
  }

  ngOnInit() {
  }

  signUp(){
    let form = this.formRegister.value
    console.log(form)
    this.authService.register(form).then( () => {
      console.log("Se registro")
    })
    // this.formRegister.value = ''
  }
  navigate(path: string){
    this.router.navigate([path])
  }

}
