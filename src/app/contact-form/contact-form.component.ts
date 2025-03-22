import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  public sendEmail(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    emailjs.sendForm('service_hx7xp4s', 'template_8qifvkx', form, 'qnf2am-_g9nRP-NdO')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);

        Swal.fire({
          title: '¡Mensaje enviado!',
          text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#primary',
        });

        form.reset();
      }, (error) => {
        console.log(error.text);

        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#primary',
        });
      });
  }
}