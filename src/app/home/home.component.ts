import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, MatDividerModule, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public requestDetails: { [key: string]: string } = {
    'service1': 'Hola, me comunico con ustedes porque estamos interesados en contratar un servicio de perforaciones y nos gustaría recibir más información y una cotización.',
    'service2': 'Hola, me comunico con ustedes porque estamos interesados en contratar un servicio de estudios y nos gustaría recibir más información y una cotización',
  };

  public selectedService: string = '';

  public onRequestService(serviceKey: string) {
    this.selectedService = serviceKey;
    const headerComponent = new HeaderComponent();
    headerComponent.scrollToSection('#contacto', true);


    setTimeout(() => {
      const detailsTextarea = document.querySelector('textarea[name="details"]') as HTMLTextAreaElement;
      if (detailsTextarea) {
        detailsTextarea.value = this.requestDetails[serviceKey];
      }
    }, 500);
  }
}
