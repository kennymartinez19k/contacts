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

  formRegister: FormGroup;
    
    constructor(public authService: AuthService, private router: Router ) { 
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
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
  }
  navigate(path: string){
    this.router.navigate([path])
  }

}
