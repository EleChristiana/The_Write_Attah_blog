import { Component } from '@angular/core';
import { SidebarComponent } from '../../../reuseable/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterLink, RouterModule],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent {

}
