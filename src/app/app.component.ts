import { Component, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // ✅ allows global styles to affect <html> and <body>
})
export class AppComponent {
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
