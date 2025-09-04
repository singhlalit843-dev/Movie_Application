import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title:string="Movie_Application";
  goHome() {
    location.href = '/';
  }
}
