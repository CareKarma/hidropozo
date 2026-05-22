import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  isSending = false;

  form = new FormGroup({
    name:    new FormControl('', [Validators.required, Validators.minLength(2)]),
    email:   new FormControl('', [Validators.required, Validators.email]),
    details: new FormControl('', [Validators.required, Validators.minLength(10)]),
    website: new FormControl(''), // honeypot — bots lo rellenan, humanos no
  });

  get name()    { return this.form.get('name')!; }
  get email()   { return this.form.get('email')!; }
  get details() { return this.form.get('details')!; }

  sendEmail() {
    if (this.form.get('website')?.value) return; // honeypot activado

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isSending) return;
    this.isSending = true;

    const { name, email, details } = this.form.value;

    emailjs
      .send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        { name, email, details },
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
          this.form.reset();
          this.isSending = false;
        },
        (error: any) => {
          console.error('[EmailJS] Error al enviar:', error);
          const detail = error?.text || error?.message || (typeof error === 'string' ? error : 'Error desconocido');
          Swal.fire({
            title: 'Error',
            text: `Hubo un problema al enviar el mensaje (${detail}). Por favor, inténtalo de nuevo.`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc2626',
          });
          this.isSending = false;
        }
      );
  }
}
