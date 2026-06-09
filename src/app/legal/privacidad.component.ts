import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { setCanonical } from '../seo/canonical';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './privacidad.component.html',
  styleUrls: ['./legal.css'],
})
export class PrivacidadComponent implements OnInit {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    this.title.setTitle('Política de Privacidad — Hidropozo SRL');
    this.meta.updateTag({
      name: 'description',
      content: 'Política de Privacidad de Hidropozo SRL conforme a la Ley 172-13 de Protección de Datos Personales de República Dominicana.',
    });
    setCanonical(this.doc, 'https://hidropozosrl.com/privacidad');
  }
}
