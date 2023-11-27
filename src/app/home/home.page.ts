import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal: any 

    constructor(private router: Router ) { 
      // constructor() {
    let usersString = localStorage.getItem("users")
    console.log(usersString)
    if(usersString){
      this.users = JSON.parse(usersString)
    }else{
      this.users = []
    }
  }
  message: any = null
  name = null
  lastName = null
  id = null
  position = null
  role = null
  file = null
  roles = [
    "Admin", "Usuario"
  ]
  hourIn = new Date().getTime()
  hourOut = new Date()
  phone = null
  isModalOpen: any = false
  isModalOpenNew = false
  
  cancel() {
    this.isModalOpen = false
    this.isModalOpenNew = false

  }

  ngOnInit(): void {
    let usersString = localStorage.getItem("users")
    if(usersString){
      this.users.push = JSON.parse(usersString)
    }else{
      this.users = []
    }
  }
  users: any = []

  confirm() {
    this.isModalOpen = false
    this.isModalOpenNew = false

    let user = {
      name: this.name,
      lastName: this.lastName,
      id: this.id,
      position: this.position,
      role: this.role,
      phone: this.phone,
      hourIn: this.hourIn,
      hourOut: this.hourOut
    }

    let usersString = localStorage.getItem("users")
    if(usersString){
      this.users =  JSON.parse(usersString)
      this.users.push(user)
    }else{
      this.users = [user]
    }
    localStorage.setItem("users", JSON.stringify(this.users))
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setOpen(condition: Boolean = false, idx: any){
  console.log('====================================');
  console.log(this.users);
  console.log('====================================');
    this.isModalOpen = condition;
    this.name =this.users[idx].name
    this.lastName =this.users[idx].lastName
    this.id =this.users[idx].id
    this.position =this.users[idx].position
    this.role =this.users[idx].role
    this.phone =this.users[idx].phone
  }

  deleteUser (index: any) {
    this.users.splice(index,1)
    localStorage.setItem("users", JSON.stringify(this.users))
  }

  loguaout () {
    this.router.navigate(['login'])

  }

}
