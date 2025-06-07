import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']  // fix typo: styleUrls (plural)
})
export class HeaderComponent {
  isOwner = false;
  alertMessage: string | null = null;
 
  constructor(private authService: AuthService, private router: Router) {
    // Subscribe to alerts
    this.authService.alert$.subscribe(message => {
      this.alertMessage = message;
    });

    // Reactively watch user signal for uid changes
    effect(() => {
      const user = this.authService.user();  // Call the signal as a function

      if (user?.uid) {
        this.authService.getUserRole(user.uid).then(role => {
          this.isOwner = role === 'owner';
        });
      } else {
        this.isOwner = false;
      }
    });
  }

   handleDashboardClick(event: Event) {
    if (!this.isOwner) {
      event.preventDefault(); // stop navigation
      // this.authService.showAlert();
    } else {
      // owner allowed to navigate
      event.preventDefault(); // prevent default anchor behavior
      this.router.navigate(['/dashboard/create-post']);
    }
  }
}
