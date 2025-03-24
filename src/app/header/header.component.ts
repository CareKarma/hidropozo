import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrollToSection(sectionId: string, highlightFields: boolean = false) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      if (highlightFields && sectionId === '#contacto') {
        setTimeout(() => {
          const nameField = document.querySelector('#name') as HTMLElement;
          const emailField = document.querySelector('#email') as HTMLElement;

          if (nameField && emailField) {
            nameField.classList.add('highlight-field');
            emailField.classList.add('highlight-field');

            // Quitar el highlight después de 2 segundos
            setTimeout(() => {
              nameField.classList.remove('highlight-field');
              emailField.classList.remove('highlight-field');
            }, 2000); // 2 segundos de highlight
          }
        }, 500); // Delay para asegurar que el scroll haya terminado
      }
    }
  }
}
