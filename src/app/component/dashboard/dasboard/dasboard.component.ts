import { Component } from '@angular/core';
import { SidebarComponent } from '../../../reuseable/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../reuseable/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardHeaderComponent } from '../../../reuseable/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dasboard',
  standalone: true,
  imports: [SidebarComponent, DashboardHeaderComponent, CommonModule, RouterLink, RouterModule, HttpClientModule],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent {

}
