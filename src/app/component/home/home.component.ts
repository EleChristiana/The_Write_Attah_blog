import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../reuseable/header/header.component';

interface BlogPost {
    id?: string; 
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  

  ngOnInit(): void {
  
  }

  
}
