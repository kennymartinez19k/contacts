import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  formLogin: FormGroup;
  isDisable: boolean = true
  showPsw: boolean = true;
  changeType: string = 'password';

    constructor(public authService: AuthService, private router: Router, private alertController: AlertController ) { 
    this.formLogin = new FormGroup({
      email: new FormControl('km@gm.com', [Validators.required]),
      password: new FormControl('123456', [Validators.required])
    })
  }

  ngOnInit() {
    this.isBtnDisable()
  }

  login(){
    let form = this.formLogin.value
    console.log(form)
    this.authService.login(form).then( (res) => {
      console.log(res,"Login")
      this.navigate('home')
    }).catch((e) => {
      this.presentAlert()
      this.formLogin = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      })
      
    })
  }
  navigate(path: string){
    this.router.navigate([path])
  }

  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion Incorrrecta',
      subHeader: '',
      message: 'Verifique la informacion Suministrada o contacte su probeedor',
      buttons: ['OK'],
    });

    await alert.present();
  }
  isBtnDisable () {
    if (this.formLogin.value.email != '' && this.formLogin.value.email != null && this.formLogin.value.password != '' && this.formLogin.value.password != null) {
      this.isDisable = false
    } else {
      this.isDisable = true

    }
  }

  isChangeType (item: any) {
    this.showPsw = !this.showPsw
   if (item != 'text') {
    this.changeType = 'text'
   } else {
    this.changeType = 'password'
    
   }
  }
}
