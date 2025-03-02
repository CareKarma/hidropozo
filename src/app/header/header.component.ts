import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrollToSection(section: string) {
    document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
