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
    date: string = 'Dic 08, 2023';
    authors: string = 'Wilson Soto, Kenny Martinez, Eddy Saul Soto';
    copyright: string = `ITSC Logistics, 2023 `;

    goToHome() {
        this.router.navigate(['home'])
    
      }
}