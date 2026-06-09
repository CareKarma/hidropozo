import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { setCanonical } from '../seo/canonical';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './terminos.component.html',
  styleUrls: ['./legal.css'],
})
export class TerminosComponent implements OnInit {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
    this.title.setTitle('Términos y Condiciones — Hidropozo SRL');
    this.meta.updateTag({
      name: 'description',
      content: 'Términos y Condiciones de uso del sitio web de Hidropozo SRL, empresa de perforación de pozos en República Dominicana.',
    });
    setCanonical(this.doc, 'https://hidropozosrl.com/terminos');
  }
}
