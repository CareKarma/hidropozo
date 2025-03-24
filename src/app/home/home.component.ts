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
    'service1': 'Detalles del servicio 1',
    'service2': 'Detalles del servicio 2',
    'service3': 'Detalles del servicio 3',
    'service4': 'Detalles del servicio 4',
    'service5': 'Detalles del servicio 5',
    'service6': 'Detalles del servicio 6',

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
