import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
