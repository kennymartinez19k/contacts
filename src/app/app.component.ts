import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd, Event   } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnChanges, OnInit{
  constructor(private router: Router, private route: ActivatedRoute) {}
  previousUrl: any;
  ngOnChanges(changes: SimpleChanges): void {
    this.infoRoute()
  }

  ngOnInit(): void {
    this.infoRoute()
  
  }

  infoRoute () {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(async (event: NavigationEnd) => {
      // this.currentUrl = event.url;
      this.previousUrl = this.router.url; // Almacenar la URL anterior antes de que la nueva navegación ocurra
      console.log('Ruta URL anterior:', this.previousUrl);
      // console.log('Ruta URL actual:', currentUrl);
      // Tu lógica para manejar el evento NavigationEnd
    });
  }
}
