import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { ContactFormComponent } from '../contact-form/contact-form.component';

const SERVICE_MESSAGES: Record<string, string> = {
  service1: 'Hola, me comunico con ustedes porque estamos interesados en contratar un servicio de perforaciones y nos gustaría recibir más información y una cotización.',
  service2: 'Hola, me comunico con ustedes porque estamos interesados en contratar un servicio de estudios y nos gustaría recibir más información y una cotización.',
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatDividerModule, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedDetails = '';

  onRequestService(serviceKey: string) {
    this.selectedDetails = SERVICE_MESSAGES[serviceKey] ?? '';
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  }
}
