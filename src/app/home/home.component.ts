import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
