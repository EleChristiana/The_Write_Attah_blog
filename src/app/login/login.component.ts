import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


     constructor(private authService: AuthService) {}

  ngOnInit(): void {
   
  }



  async loginWithGoogle() {
    await this.authService.loginWithGoogle();
  }


  get isDarkTheme(): boolean {
  return document.body.classList.contains('dark-theme');
}

}
