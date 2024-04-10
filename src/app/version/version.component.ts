import { Component,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-version',
  templateUrl: 'version.component.html',
  styleUrls: ['version.component.scss'],
})
export class VersionComponent {
    constructor (private router: Router) {}
    version: string = '1.1.1';  
    date: string = 'Mar 19, 2024';
    authors: string = 'Wilson Soto, Kenny Martinez, Eddy Saul Soto, Eliam Manuel Contreras, Luis Henrry Franco';
    tuition: string = '2021-0372, 2020-1832, 2021-0154, 2021-0051, 2022-0297';
    copyright: string = `ITSC Developers, 2024 `;

    goToHome() {
        this.router.navigate(['home'])
    
      }
}