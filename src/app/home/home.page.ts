import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { UserService } from '../services/user.services'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal: any 

  constructor(private userServices: UserService, private router: Router ) { 
  }
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
  isModalOpen: any = false
  isModalOpenNew = false
  
  cancel() {
    this.isModalOpen = false
    this.isModalOpenNew = false

  }

  ngOnInit(): void {
    this.userServices.getUsers().subscribe(users => {
      this.users = users;
    });
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

  createUser(){
    this.isModalOpen = false
    this.isModalOpenNew = false

    let user = {
      name: this.name,
      lastName: this.lastName,
      position: this.position,
      role: this.role,
      phone: this.phone,
      hourIn: this.hourIn,
      hourOut: this.hourOut,
      file: this.file,
      userId: `${new Date().getTime()}-${this.phone}`
    }

    this.userServices.addUser(user).then( (userId) => {
      console.log(userId)
    })
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
    let user = this.users[index]
    // this.users.splice(index,1)
    this.userServices.deleteUser(user.userId).then(users => {
      this.users = users;
    });
  }

  loguaout () {
    this.router.navigate(['login'])

  }

}
