import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { UserService } from '../services/user.services';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  @ViewChild(IonModal) modal: any;

  constructor(
    private userServices: UserService,
    public authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    public popoverController: PopoverController
  ) {}
  message: any = null;
  name: any = null;
  searchNames: any = null;
  lastName: any = null;
  id: any = null;
  position: any = null;
  role: any = null;
  file: any = null;
  roles: any = ['Admin', 'Usuario'];
  hourIn: any = null;
  hourOut: any = null;
  phone: any = null;
  email: any = null;
  password: any = null;
  isModalOpen: any = false;
  isModalOpenNew = false;
  usersProfile: any;
  active: any = false
  usersToDisplay: any = [];
  imageElement: any = null;
  additionalImgName: any = null;
  dismiss: boolean = false;

  cancel() {
    this.isModalOpen = false;
    this.isModalOpenNew = false;

      this.name = null;
      this.lastName = null;
      this.id = null;
      this.position = null;
      this.role = null;
      this.phone = null;
      this.hourIn = null;
      this.hourOut = null;
      this.email = null;
      this.password = null;
  }

  ngOnInit(): void {
    this.getUsers();
  }
  ngOnChanges() {
    this.getUsers();
        
  }
  users: any = [];

  confirm() {
    this.isModalOpen = false;
    this.isModalOpenNew = false;

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
      password: this.password,
      active: this.active,

    };

    let usersString = localStorage.getItem('users');
    if (usersString) {
      this.users = JSON.parse(usersString);
      this.users.push(user);
    } else {
      this.users = [user];
    }
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  async createUser() {
    this.isModalOpen = false;
    this.isModalOpenNew = false;

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
      active: true,
      userId: `${new Date().getTime()}-${this.phone}`,
    };
    try {
      let result = await this.signUp();
      if (result) {
        this.userServices.addUser(user).then((userId) => {
          this.getUsers();
        });
      }
    } catch (error) {
      this.alertStatusError({
        header: 'Error al Crear el Usuario',
        text: 'Confirme que todos los campos esten correctamente',
      })
    }
  }

  async signUp() {
    let form = {
      email: this.email,
      password: this.password,
    };
    try {
      let result = await this.authService.register(form);
      console.log(result);
      return true;
    } catch (error: any) {
      this.alertStatusError({
        header: 'Error al Crear el Usuario',
        text: 'Confirme que ha escrito todo correctamente y / o  la contraseña tiene más de 6 caracteres',
      })
      return false;
    }
  }

  async getUsers() {
    this.userServices.getUsers().subscribe((users) => {
      this.users = users;
      this.usersToDisplay = users;
      this.filterByUserLogin()
    });
  }
  async filterByUserLogin () {
    let user = await JSON.parse(localStorage.getItem("user") || "{}")
     this.users.forEach((us: any) => {
      if (us.email == user.email) {
        user.displayName = us.name
        user.rol = us.rol
        localStorage.setItem("user", JSON.stringify(user))
      }
    });
    // filter((us: any) => us.email == user.email)
console.log('====================================');
console.log(this.users);
console.log('====================================');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setOpen(condition: Boolean = false, idx: any) {
    this.isModalOpen = condition;
    this.name = this.users[idx].name;
    this.lastName = this.users[idx].lastName;
    this.id = this.users[idx].id;
    this.position = this.users[idx].position;
    this.role = this.users[idx].role;
    this.phone = this.users[idx].phone;
    this.email = this.users[idx]?.email;
    this.password = this.users[idx]?.password;
    this.active = this.users[idx]?.active;
  }

  deleteUser(index: any) {
    let user = this.users[index];
    this.users.splice(index, 1);
    this.userServices.deleteUser(user.userId).then((users) => {});

    console.log(this.users);
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

  filterByOrdersPerName(val: any, diss: any) {
    if (val == '') {
      val = null;
      this.searchNames = null;
    } else {
      this.searchNames = val;
    }
    this.dismiss = diss;
    if (diss) {
      this.closPopUp();
    }
    if (val) {
      this.users = this.usersToDisplay.filter((user: any) =>
        user.name.toUpperCase().includes(val.toUpperCase())
      );
      if (this.users.length == 0) {
        this.alertStatusError({
          header: 'Usuario no Encontrada.',
          text: 'Confirme que ha escrito el nombre correctamente',
        });
      }
    } else {
      this.users = this.usersToDisplay;
    }
  }
  async alertStatusError(alertMsg: any) {
    const alert = await this.alertController.create({
      header: alertMsg.header,
      message: alertMsg.text,
      buttons: ['Ok'],
    });
    await alert.present();
  }
  
  closPopUp() {
    const popover = document.getElementById('popover');

    if (popover) {
      this.popoverController.dismiss();
    }
  }

  async alertDelete(alertMsg: any) {
    const alert = await this.alertController.create({
      header: alertMsg.header,
      message: alertMsg.text,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Botón "Cancel" presionado');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteUser(alertMsg.idx)
          }
        }
      ],
    });
    await alert.present();
  }

  allertDeleteUser(index: any) {
    this.alertDelete({
      header: 'Eliminar Usuario',
      text: 'Esta seguro que desea eliminar este usuario. Una vez eliminado no se podra recuperar',
      idx: index
    })
  }

 
}
