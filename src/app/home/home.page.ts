import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal: any 

  constructor() {}
  message: any = null
  name = null
  hourIn = null
  hourOut = null
  isModalOpen: any = false
  cancel() {
    this.isModalOpen = false
  }
  users = [1,2,3]

  confirm() {
    this.isModalOpen = false
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setOpen(condition: Boolean = false){
    this.isModalOpen = condition;
  }

}
