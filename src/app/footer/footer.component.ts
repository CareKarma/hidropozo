import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-footer',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isFooterVisible = false;
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  checkScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 300) {
      this.isFooterVisible = true;
    } else {
      this.isFooterVisible = false;
    }
  }
}