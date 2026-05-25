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
    _hp: new FormControl(''), // honeypot — bots lo rellenan, humanos no
  });

  get name()    { return this.form.get('name')!; }
  get email()   { return this.form.get('email')!; }
  get details() { return this.form.get('details')!; }

  async sendEmail() {
    // Debug: log form state at the moment of submit
    console.log('[Form] sendEmail() called');
    console.log('[Form] valid:', this.form.valid, '| invalid:', this.form.invalid);
    console.log('[Form] values:', this.form.value);
    console.log('[Form] errors:', this.form.errors);
    console.log('[Form] name errors:', this.name.errors, '| email errors:', this.email.errors, '| details errors:', this.details.errors);

    if (this.form.get('_hp')?.value) {
      console.log('[Form] Honeypot activado, abortando');
      return; // honeypot activado
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('[Form] Formulario inválido, abortando');
      return;
    }

    if (this.isSending) return;
    this.isSending = true;

    const nameVal    = (this.form.get('name')!.value    || '').trim();
    const emailVal   = (this.form.get('email')!.value   || '').trim();
    const detailsVal = (this.form.get('details')!.value || '').trim();

    console.log('[Form] Enviando a Web3Forms…');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: environment.web3forms.accessKey,
          from_name: nameVal,
          name:    nameVal,
          email:   emailVal,
          message: detailsVal,
          subject: 'Solicitud de servicio',
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
