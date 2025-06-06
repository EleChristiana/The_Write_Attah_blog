import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../reuseable/header/header.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService) {
  this.authService.alert$.subscribe(message => {
    this.alertMessage = message;
  });
}

  alertMessage: string | null = null;

  cards = [
    {
      image: 'https://via.placeholder.com/300x150',
      title: 'Card Title 1',
      text: 'This is a longer card with supporting text below...'
    },
    {
      image: 'https://via.placeholder.com/300x150',
      title: 'Card Title 2',
      text: 'This is a short card.'
    },
    {
      image: 'https://via.placeholder.com/300x150',
      title: 'Card Title 3',
      text: 'This is a longer card with supporting text below...'
    },
    {
      image: 'https://via.placeholder.com/300x150',
      title: 'Card Title 4',
      text: 'This is a longer card with supporting text below...'
    }
  ];
}

