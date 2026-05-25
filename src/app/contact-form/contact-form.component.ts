import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
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

  async sendEmail() {
    if (this.form.get('website')?.value) return; // honeypot activado

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isSending) return;
    this.isSending = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: environment.web3forms.accessKey,
          name:    this.form.get('name')!.value,
          email:   this.form.get('email')!.value,
          message: this.form.get('details')!.value,
          subject: this.form.get('name')!.value + '- Solicitud de  cotización',
        })
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: '¡Mensaje enviado!',
          text: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#1d4ed8',
        });
        this.form.reset();
      } else {
        throw new Error(data.message || 'Error desconocido');
      }
    } catch (error: any) {
      console.error('[Web3Forms] Error al enviar:', error);
      Swal.fire({
        title: 'Error',
        text: `Hubo un problema al enviar el mensaje (${error?.message || 'Error desconocido'}). Por favor, inténtalo de nuevo.`,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      this.isSending = false;
    }
  }
}
