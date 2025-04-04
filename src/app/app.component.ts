import { Component } from '@angular/core';
import { Router, Event, NavigationEnd,NavigationStart, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], // Add RouterOutlet here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // TESTS NAVIGATION VIA ROUTER LINKS!!
  // constructor(private router: Router) {
  //   this.router.events.subscribe((event: Event) => {
  //     if (event instanceof NavigationStart) {
  //       console.log('Navigation START:', event.url);
  //     }
  //     if (event instanceof NavigationEnd) {
  //       console.log('Navigation END:', event.url);
  //     }
  //   });
  // }
}