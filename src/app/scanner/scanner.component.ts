import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent  implements OnInit, OnDestroy {
  formLogin: FormGroup;
  isDisable: boolean = true
  showPsw: boolean = true;
  changeType: string = 'password';
  isMobile: boolean = false
  isModalOpenScan: boolean = false;
  isStopCanner: boolean = true;
    constructor(public authService: AuthService, private router: Router, private alertController: AlertController ) { 
    this.formLogin = new FormGroup({
      email: new FormControl('km@gm.com', [Validators.required]),
      password: new FormControl('123456', [Validators.required])
    })
  }

  ngOnInit() {
    this.isBtnDisable()
    this.isMobile = this.isDevice();
  }

  login(){
    let form = this.formLogin.value
    console.log(form)
    this.authService.login(form).then( (res) => {
      console.log(res,"Login")
      localStorage.setItem("user", JSON.stringify(res.user))
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
  this.isStopCanner = true

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

  isDevice() {
    const isIOS = () => {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];
      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    };
    return isIOS();
  }
  async checkPermission () {
    try {
      const status  = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true
      }
      return false

    } catch (error) {
      console.log(error);
      return false
      
    }
  }
  
  async startScan  () {
  this.isStopCanner = true

   try {
    const permission = await this.checkPermission ()

    if (!permission) {
      return;
    }

    await BarcodeScanner.hideBackground();
    const bodyElement = document.querySelector('body');

if (bodyElement !== null) {
  bodyElement.classList.add('scanner-active');
}
  const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

  if (result?.hasContent) {
    console.log(result.content); // log the raw scanned content
   const rest = result.content.split('/')
   if (rest[2].includes('@')) {
     this.formLogin = new FormGroup({
      email: new FormControl(rest[2], [Validators.required]),
      password: new FormControl(rest[3], [Validators.required])
    })
    this.login()
      console.log(rest,'ppppp'); // log the raw scanned content
  }
    
  }
  this.isModalOpenScan = false
   } catch (error) {
    console.log(error);
    
   }
   this.stopScan();
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    let essage = `Hello, ${ev.detail.data}!`;
  }
}
  ngOnDestroy(): void {
   this.stopScan();
      
  }

 stopScan  () {
  this.isStopCanner = false
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();

  const bodyElement = document.querySelector('body');

if (bodyElement !== null) {
  bodyElement.classList.remove('scanner-active');
}
};
}

