import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_hx7xp4s', 'template_8qifvkx', e.target as HTMLFormElement, 'qnf2am-_g9nRP-NdO')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}
