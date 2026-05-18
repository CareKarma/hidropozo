import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  @Input() set details(value: string) {
    this.detailsValue = value ?? '';
  }

  detailsValue = '';
  isSending = false;

  sendEmail(e: Event) {
    e.preventDefault();
    if (this.isSending) return;

    const form = e.target as HTMLFormElement;
    this.isSending = true;

    emailjs
      .sendForm(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        form,
        environment.emailjs.publicKey
      )
      .then(
        () => {
          Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#1d4ed8',
          });
          form.reset();
          this.detailsValue = '';
          this.isSending = false;
        },
        () => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc2626',
          });
          this.isSending = false;
        }
      );
  }
}
