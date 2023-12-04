import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
    constructor (private router: Router,
      private userServices: UserService
      ) {}

  users: any = []
  message: any = null
  name: any = null
  lastName: any = null
  position: any = null
  role: any = null
  file: any = null
  roles: any = [
    "Admin", "Usuario"
  ]
  hourIn: any = null
  hourOut: any = null
  phone: any = null
  email: any = null
  password: any = null
  userInfo: any =  {};
  active: any = null;
  userId: any = null;

  cancel() {
    this.router.navigate(['home'])

    
    this.name = null;
    this.lastName = null;
    this.userId = null;
    this.position = null;
    this.role = null;
    this.phone = null;
    this.hourIn = null;
    this.hourOut = null;
    this.email = null;
    this.password = null
    this.active  = null;
    this.userId = null;
  }

  async ngOnInit() {
    this.userInfo = await JSON.parse(localStorage.getItem("user") || "{}")
    this.setValueUser()
      
  }
  setValueUser () {
    this.name = this.userInfo.name;
    this.lastName = this.userInfo.lastName;
    this.userId = this.userInfo.userId;
    this.position = this.userInfo.position;
    this.role = this.userInfo.role;
    this.phone = this.userInfo.phone;
    this.hourIn = this.userInfo.hourIn;
    this.hourOut = this.userInfo.hourOut;
    this.email = this.userInfo.email;
    this.password = this.userInfo.password;
  }
  confirm() {
    let user = {
      name: this.name,
      lastName: this.lastName,
      userId: this.userId,
      position: this.position,
      role: this.role,
      phone: this.phone,
      hourIn: this.hourIn,
      hourOut: this.hourOut,
      email: this.email,
      password: this.password
    }

    let usersString = localStorage.getItem("users")
    if(usersString){
      this.users =  JSON.parse(usersString)
      this.users.push(user)
    }else{
      this.users = [user]
    }
    localStorage.setItem("users", JSON.stringify(this.users))
    this.router.navigate(['home'])

  }

  async editUser(){
    let index = this.users.findIndex((x: any) => x.userId == this.userId)
    let user = {
      name: this.name,
      lastName: this.lastName,
      position: this.position,
      role: this.role,
      phone: this.phone,
      hourIn: this.hourIn,
      hourOut: this.hourOut,
      email: this.email,
      password: this.password,
      active: this.active,
      userId: this.userId,
    };
    try{
      let res = await this.userServices.updateUser(user.userId, user)
      this.router.navigate(['home'])
      this.cancel()
      console.log(res)
    }catch(err: any){
      console.log(err.message)
    }
  }
  
}