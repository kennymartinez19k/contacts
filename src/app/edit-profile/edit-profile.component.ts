import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.scss'],
})
export class EditProfileComponent {
    constructor (private router: Router) {}

  users: any = []
  message: any = null
  name: any = null
  lastName: any = null
  id: any = null
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
  
  cancel() {
    this.router.navigate(['home'])

    
    this.name = null,
    this.lastName = null,
    this.id = null,
    this.position = null,
    this.role = null,
    this.phone = null,
    this.hourIn = null,
    this.hourOut = null,
    this.email = null,
    this.password = null

  }
  confirm() {
    let user = {
      name: this.name,
      lastName: this.lastName,
      id: this.id,
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
  
}