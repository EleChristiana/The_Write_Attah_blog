import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../reuseable/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
