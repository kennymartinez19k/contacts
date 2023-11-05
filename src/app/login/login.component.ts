import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  formLogin: FormGroup;
    
    constructor(public authService: AuthService, private router: Router ) { 
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  login(){
    let form = this.formLogin.value
    console.log(form)
    this.authService.login(form).then( () => {
      console.log("Login")
      this.navigate('home')
    })
  }
  navigate(path: string){
    this.router.navigate([path])
  }

}
