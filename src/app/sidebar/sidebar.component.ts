import { Component,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd   } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnChanges {
  constructor(private router: Router, private route: ActivatedRoute) {}
  userServices: any;
  subscription: any = null
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
    this.subscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
      ).subscribe(async () => {
        this.userServices = JSON.parse(localStorage.getItem("user") || "{}")
        const currentUrl = this.route.snapshot.url.join('/');
        console.log('Ruta URL actual:', this.route.snapshot); 
        console.log('Ruta URL actual:', currentUrl);
        console.log("entreeeeeee")
  console.log('Ruta URL actual:', this.userServices); 
}) 
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userServices = JSON.parse(localStorage.getItem("user") || "{}")
  
  }

  
  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null;
  }
  routeComponent (rut: any, remove: any = null) {
    this.router.navigate([rut])
    if (remove) {
      localStorage.removeItem('user')
    }

  }

}

