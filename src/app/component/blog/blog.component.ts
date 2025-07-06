import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../reuseable/header/header.component';
import { collection, collectionData, Firestore, Timestamp } from '@angular/fire/firestore';
import { BlogdetailsService } from '../../blogdetails.service';

interface BlogPost {
    id?: string; // ID from Firestore (optional if you want to avoid strict checks)
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any;
}


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  cards: BlogPost[] = [];
  
    constructor(private firestore: Firestore, private blogService: BlogdetailsService) {}
  
    
  
    ngOnInit(): void {
      const postsRef = collection(this.firestore, 'post');
  
      collectionData(postsRef, { idField: 'id' }).subscribe((data) => {
        this.cards = data as BlogPost[];
      });
    }
  
    formatDate(timestamp: any): string {
      if (!timestamp) return '';
  
      let date: Date;
  
      if (timestamp instanceof Timestamp) {
        date = timestamp.toDate();
      } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else {
        date = new Date(timestamp);
      }
  
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });
    }

}
