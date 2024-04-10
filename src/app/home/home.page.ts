import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UserService } from '../services/user.services';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  orderBy,
  startAt,
  endAt,
} from '@angular/fire/firestore';
import { PopoverController } from '@ionic/angular';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnChanges, OnDestroy {
  @ViewChild(IonModal) modal: any;

  constructor(
    private userServices: UserService,
    public authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    public popoverController: PopoverController,
    private firestore: Firestore
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
  ext: any = null;
  email: any = null;
  password: any = null;
  isModalOpen: any = false;
  isModalOpenNew = false;
  isOpenInvoices = false;
  usersProfile: any;
  active: any = false;
  userId: any = null;
  usersToDisplay: any = [];
  imageElement: any = null;
  additionalImgName: any = null;
  dismiss: boolean = false;
  subscription: any = null;
  invoicesData: any = {
    name: 'B0200050303',
    invoice_date: 'March 07, 2024',
    invoice_date_due: 'March 07, 2024',
    invoice_origin: 'S57931',
    subtotal: 4476.24,
    amount_tax: 671.8,
    amount_total: 5148.04,
    payment_reference: 'B0200050303',
    client_name: 'Andres  De Leon ',
    commercial_company_name: 'Supply Mami ',
    payment_term: 'Pago Contra Entrega',
    phone: '8092198579',
    products: [
      {
        product_id: 1040,
        description: 'Dispensador 20 Onz. C/Tapa - Unidad',
        invoiced_qty: 4,
        ordered_qty: 4,
        price_unit: 22.88,
        price_subtotal: 91.52,
        price_unit_with_tax: 26.9975,
        price_total: 107.99,
      },
      {
        product_id: 3568,
        description:
          'Oferta Papel Higienico Niveo-Fardo (48/1) + GRATIS 12 Paq. Servilletas Niveo',
        invoiced_qty: 1,
        ordered_qty: 48,
        price_unit: 677.97,
        price_subtotal: 677.97,
        price_unit_with_tax: 800,
        price_total: 800,
      },
      {
        product_id: 621,
        description: 'Suavizante Macier 750 Ml',
        invoiced_qty: 3,
        ordered_qty: 3,
        price_unit: 63.56,
        price_subtotal: 190.68,
        price_unit_with_tax: 75,
        price_total: 225,
      },
      {
        product_id: 616,
        description: 'Jabon De Cuaba Macier Gl',
        invoiced_qty: 2,
        ordered_qty: 2,
        price_unit: 190.68,
        price_subtotal: 381.36,
        price_unit_with_tax: 225,
        price_total: 450,
      },
      {
        product_id: 618,
        description: 'Jabon De Cuaba Macier 1/2 Galon',
        invoiced_qty: 2,
        ordered_qty: 2,
        price_unit: 109.46,
        price_subtotal: 218.92,
        price_unit_with_tax: 129.165,
        price_total: 258.33,
      },
      {
        product_id: 1832,
        description: 'Fabuloso Bebe Sachet 85Ml - Paq. (12/1)',
        invoiced_qty: 2,
        ordered_qty: 2,
        price_unit: 94.07,
        price_subtotal: 188.14,
        price_unit_with_tax: 111.005,
        price_total: 222.01,
      },
      {
        product_id: 178,
        description: 'Vino Tinto La Fuerza 350 Ml - Botella ',
        invoiced_qty: 3,
        ordered_qty: 3,
        price_unit: 77.88,
        price_subtotal: 233.64,
        price_unit_with_tax: 91.89999999999999,
        price_total: 275.7,
      },
      {
        product_id: 1910,
        description: 'Sal Molida Refisal 25/1 Lb Funda',
        invoiced_qty: 1,
        ordered_qty: 1,
        price_unit: 201.69,
        price_subtotal: 201.69,
        price_unit_with_tax: 237.99,
        price_total: 237.99,
      },
      {
        product_id: 1911,
        description: 'Sopas Pollo  Issima Vasos 12/1',
        invoiced_qty: 1,
        ordered_qty: 1,
        price_unit: 313.56,
        price_subtotal: 313.56,
        price_unit_with_tax: 370,
        price_total: 370,
      },
      {
        product_id: 2823,
        description: 'Sardina con Coco 215 Gr',
        invoiced_qty: 4,
        ordered_qty: 4,
        price_unit: 46.61,
        price_subtotal: 186.44,
        price_unit_with_tax: 55,
        price_total: 220,
      },
      {
        product_id: 1170,
        description: 'Dimar Sardinas Tomate Tall 425 Grs - Enlatado',
        invoiced_qty: 3,
        ordered_qty: 3,
        price_unit: 72,
        price_subtotal: 216,
        price_unit_with_tax: 72,
        price_total: 216,
      },
      {
        product_id: 1199,
        description: 'Dimar Atun Trozos En Agua 170 Grs. - Enlatado',
        invoiced_qty: 3,
        ordered_qty: 3,
        price_unit: 67.8,
        price_subtotal: 203.4,
        price_unit_with_tax: 80.00333333333333,
        price_total: 240.01,
      },
      {
        product_id: 1198,
        description: 'Dimar Atun Trozos Aceite 170 Grs. - Enlatado',
        invoiced_qty: 3,
        ordered_qty: 3,
        price_unit: 67.8,
        price_subtotal: 203.4,
        price_unit_with_tax: 80.00333333333333,
        price_total: 240.01,
      },
      {
        product_id: 1197,
        description: 'Dimar Atun Desmenuzado Agua 170 Grs. - Enlatado',
        invoiced_qty: 5,
        ordered_qty: 5,
        price_unit: 46.61,
        price_subtotal: 233.05,
        price_unit_with_tax: 55,
        price_total: 275,
      },
      {
        product_id: 1196,
        description: 'Dimar Atun Desmenuzado  Aceite 170 Grs. - Enlatado',
        invoiced_qty: 5,
        ordered_qty: 5,
        price_unit: 49.15,
        price_subtotal: 245.75,
        price_unit_with_tax: 57.998000000000005,
        price_total: 289.99,
      },
      {
        product_id: 1904,
        description: 'Leche Evaporada Carnation 145 Gr',
        invoiced_qty: 12,
        ordered_qty: 12,
        price_unit: 44,
        price_subtotal: 528,
        price_unit_with_tax: 44,
        price_total: 528,
      },
      {
        product_id: 612,
        description: 'Vinagre Doña Marina Gl',
        invoiced_qty: 2,
        ordered_qty: 2,
        price_unit: 81.36,
        price_subtotal: 162.72,
        price_unit_with_tax: 96.005,
        price_total: 192.01,
      },
    ],
    company_name: 'GRUPO CAONA SAS',
    company_rnc: '132646541',
    company_email: 'servicio@jabiya.com',
    company_phone: '809-565-5518 Ext 288',
    company_mobile: '849-456-7567',
    order_adviser: 'TELE-MKT. JERLIN CASTRO',
    partner_id: 2119,
    partner_shipping_id: 2119,
    partner_rnc: '00117742056',
    invoice_nfc_due_date: 'December 31, 2023',
    partner_street: 'calle 34#9  calle 34#9',
    partner_sector: 'CRISTO REY',
    partner_city: 'SANTO DOMINGO CENTRO (DN) (DN)',
    taxes: [
      {
        name: '18% ITBIS en Ventas',
        percent: 18,
        value: 671.803,
      },
      {
        name: 'Exento ITBIS Ventas',
        percent: 0,
        value: 0,
      },
    ],
  };
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

  async ngOnInit() {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        console.log('entreeeeeee');
        await this.getUsers();
      });
  }

  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null;
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
  }

  async createUser() {
    this.isModalOpen = false;
    this.isModalOpenNew = false;

    let user: any = {
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
      id: `${new Date().getTime()}-${this.phone}`,
    };
    try {
      let result = await this.signUp();
      if (result) {
        let id = await this.userServices.addUser(user);
        user.userId = id;
        await this.userServices.updateUser(user.userId, user);
        this.getUsers();
      }
    } catch (error) {
      this.alertStatusError({
        header: 'Error al Crear el Usuario',
        text: 'Confirme que todos los campos esten correctamente',
      });
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
      });
      return false;
    }
  }

  async getUsers() {
    this.userServices.getUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
      this.usersToDisplay = users;
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      console.log(this.users);
      let currentUser = this.users.find((x: any) => x.email == user.email);
      console.log(currentUser);
      this.usersProfile = { ...user, ...currentUser };
      // this.usersProfile.role = 'Admin'
      console.log(this.usersProfile);
      localStorage.setItem('user', JSON.stringify(this.usersProfile));
    });
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
    this.userId = this.users[idx]?.userId;
    this.hourIn = this.users[idx]?.hourIn;
    this.hourOut = this.users[idx]?.hourOut;
  }

  async deleteUser(index: any) {
    let user = this.users[index];
    try {
      await this.userServices.deleteUser(user.userId);
      this.cancel();
      this.users.splice(index, 1);
      this.getUsers();
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async editUser() {
    let index = this.users.findIndex((x: any) => x.userId == this.userId);
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

    try {
      let res = await this.userServices.updateUser(user.userId, user);
      this.cancel();
      this.getUsers();
      console.log(res);
    } catch (err: any) {
      console.log(err.message);
    }
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
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteUser(alertMsg.idx);
          },
        },
      ],
    });
    await alert.present();
  }

  allertDeleteUser(index: any) {
    this.alertDelete({
      header: 'Eliminar Usuario',
      text: 'Esta seguro que desea eliminar este usuario. Una vez eliminado no se podra recuperar',
      idx: index,
    });
  }
}
