
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../reuseable/header/header.component';
import { collection, collectionData, Firestore, Timestamp } from '@angular/fire/firestore';
import { BlogdetailsService } from '../../blogdetails.service';
import { FooterComponent } from '../../reuseable/footer/footer.component';

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  cards: BlogPost[] = [];         
  paginatedCards: BlogPost[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;

  constructor(private firestore: Firestore, private blogService: BlogdetailsService) {}

  ngOnInit(): void {
    const postsRef = collection(this.firestore, 'post');

    collectionData(postsRef, { idField: 'id' }).subscribe((data) => {
      this.cards = data as BlogPost[];
      this.totalPages = Math.ceil(this.cards.length / this.itemsPerPage);
      this.updatePaginatedCards();
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

  updatePaginatedCards() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCards = this.cards.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedCards();
  }
}
