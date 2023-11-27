/* eslint-disable max-len */

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, sendPasswordResetEmail, GoogleAuthProvider, getAuth, signInWithCredential} from '@angular/fire/auth';
import { LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/firebase-environment';
import { Platform } from '@ionic/angular';
import {initializeApp} from 'firebase/app'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isWeb = false
  firebase: any
  constructor(
    private auth: Auth,
    private router: Router
  ) {
      this.firebase = initializeApp(environment)
    }

  async register({email, password}: any) {
    await createUserWithEmailAndPassword(this.auth, email, password)
  }

  async login({ email, password }: any) {
     return await signInWithEmailAndPassword(this.auth, email, password);
  }


  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

 async getUserUid() {
  const user = await this.auth.currentUser
  if(user) {
    return user.uid
  }else {
    return null
  }
 }
 

}
