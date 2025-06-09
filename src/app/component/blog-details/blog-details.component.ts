import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogdetailsService, BlogPost } from '../../blogdetails.service';
import { Timestamp } from '@angular/fire/firestore';
import { HeaderComponent } from '../../reuseable/header/header.component';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  post?: BlogPost;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogdetailsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getPostById(id).subscribe(post => {
        this.post = post;
      });
    }
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
