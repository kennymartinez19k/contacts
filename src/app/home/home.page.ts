import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { UserService } from '../services/user.services'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal: any 

  constructor(private userServices: UserService, public authService: AuthService, private router: Router ) { 
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
  email: any = null
  password: any = null
  isModalOpen: any = false
  isModalOpenNew = false
  usersProfile: any;
  
  imageElement: any = null;
  additionalImgName: any = null;




  cancel() {
    this.isModalOpen = false;
    this.isModalOpenNew = false;

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

  ngOnInit(): void {
    this.getUsers()
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
  }

  async createUser(){
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
      email: this.email,
      password: this.password,
      file: this.file,
      userId: `${new Date().getTime()}-${this.phone}`
    }
    let result = await this.signUp()
    if(result){
      this.userServices.addUser(user).then( (userId) => {
        this.getUsers()
      })
    }
  }

  async signUp(){
    let form = {
      email: this.email,
      password: this.password
    }
    try {
      let result = await this.authService.register(form)
      console.log(result)
      return true
    } catch (error) {
      return false      
    }
  }


  getUsers(){
    this.userServices.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setOpen(condition: Boolean = false, idx: any){
    this.isModalOpen = condition;
    this.name =this.users[idx].name
    this.lastName =this.users[idx].lastName
    this.id =this.users[idx].id
    this.position =this.users[idx].position
    this.role =this.users[idx].role
    this.phone =this.users[idx].phone
    this.email = this.users[idx]?.email
    this.password =this.users[idx]?.password
  }

  deleteUser (index: any) {
    let user = this.users[index]
    this.users.splice(index,1)
    this.userServices.deleteUser(user.userId).then(users => {
    });

    console.log(this.users)
  }

  async pickImage(event: any) {
    let blob = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    let img;

    reader.onloadend = async function () {
      img = reader.result;
    };
    let delay = (ms: number | undefined) =>
      new Promise((res) => setTimeout(res, ms));
    await delay(1000);
    this.additionalImgName = blob.name;
    this.imageElement = img;
  }
 
}
