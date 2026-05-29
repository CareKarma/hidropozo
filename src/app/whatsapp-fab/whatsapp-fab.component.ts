import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WhatsappLine {
  label: string;   // número visible
  href: string;    // enlace wa.me en formato internacional
}

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-fab.component.html',
  styleUrls: ['./whatsapp-fab.component.css']
})
export class WhatsappFabComponent {
  isOpen = false;

  // Chat vacío (sin mensaje pre-escrito). Formato internacional con +1.
  lines: WhatsappLine[] = [
    { label: '809-359-3011', href: 'https://wa.me/18093593011' },
    { label: '829-716-8571', href: 'https://wa.me/18297168571' },
  ];

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }
}
