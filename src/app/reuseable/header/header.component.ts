import { CommonModule } from '@angular/common';
import { Component, computed, effect, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']  
})
export class HeaderComponent implements OnInit {
  isOwner = false;
  alertMessage: string | null = null;
    themeIcon: string = 'fa fa-moon';
 
  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) {
    
    this.authService.alert$.subscribe(message => {
      this.alertMessage = message;
    });

    
    effect(() => {
      const user = this.authService.user();  

      if (user?.uid) {
        this.authService.getUserRole(user.uid).then(role => {
          this.isOwner = role === 'owner';
        });
      } else {
        this.isOwner = false;
      }
    });
  }
  ngOnInit(): void {
      this.renderer.addClass(document.body, 'light-theme');
  }

   handleDashboardClick(event: Event) {
    if (!this.isOwner) {
      event.preventDefault();  
    } else {
      
      event.preventDefault(); 
      this.router.navigate(['/dashboard/create-post']);
    }
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
