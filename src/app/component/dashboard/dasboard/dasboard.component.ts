import { Component } from '@angular/core';
import { SidebarComponent } from '../../../reuseable/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../reuseable/header/header.component';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterLink, RouterModule],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent {

}
