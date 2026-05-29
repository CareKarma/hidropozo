import { Component, AfterViewInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { WhatsappFabComponent } from '../whatsapp-fab/whatsapp-fab.component';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { CountUpDirective } from '../count-up/count-up.directive';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ContactFormComponent, WhatsappFabComponent, ProjectGalleryComponent, TestimonialsComponent, CountUpDirective, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    initFlowbite();
  }

  onRequestService(_serviceKey: string) {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToSection(sectionId: string) {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
