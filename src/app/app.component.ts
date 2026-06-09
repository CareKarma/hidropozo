import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hidropozo';

  constructor(viewportScroller: ViewportScroller) {
    // El scroll por fragmento del router no respeta scroll-margin:
    // compensa el header fijo (72px) + un pequeño respiro.
    viewportScroller.setOffset([0, 80]);
  }
}
