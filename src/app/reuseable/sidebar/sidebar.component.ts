import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
 
  sidebarActive = false;
  themeIcon: string = 'fa fa-moon';



   ngOnInit(): void {
       this.renderer.addClass(document.body, 'light-theme');
  }

  constructor( private renderer: Renderer2){
    
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }


  toggleTheme(): void {
    const isLight = document.body.classList.contains('light-theme');

    if (isLight) {
      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.addClass(document.body, 'dark-theme');
      this.themeIcon = 'fa fa-sun';
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, 'light-theme');
      this.themeIcon = 'fa fa-moon';
    }
  }
}
