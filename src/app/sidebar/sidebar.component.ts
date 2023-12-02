import { Component,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd   } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnChanges {
  constructor(private router: Router, private route: ActivatedRoute) {}
  userServices: any;
  accountPages = [
    {
       title: 'Log In',
       url: '/auth/login',
       ionicIcon: 'log-in-outline'
    },
    {
       title: 'Sign Up',
       url: '/auth/signup',
       ionicIcon: 'person-add-outline'
    },
  ]

  ngOnInit(): void {
    this.userServices = JSON.parse(localStorage.getItem("user") || "{}")
    const currentUrl = this.route.snapshot.url.join('/');
    console.log('Ruta URL actual:', this.route.snapshot); 
    console.log('Ruta URL actual:', currentUrl); 
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userServices = JSON.parse(localStorage.getItem("user") || "{}")
    const currentUrl = this.route.snapshot.url.join('/');
  console.log('Ruta URL actual:', currentUrl); 
  
  
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const previousUrl = this.router.url;
      console.log('Ruta URL anterior:', previousUrl);
    }
  });
  }

  
  routeComponent (rut: any) {
    this.router.navigate([rut])

  }

}

