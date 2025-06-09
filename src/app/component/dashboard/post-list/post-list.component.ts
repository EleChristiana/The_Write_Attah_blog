import { Component, OnInit } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';



interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any;
}

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
   posts: BlogPost[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    const postRef = collection(this.firestore, 'post');
    collectionData(postRef, { idField: 'id' }).subscribe((data: any) => {
      this.posts = data;
    });
  }

  deletePost(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      const postRef = doc(this.firestore, `post/${id}`);
      deleteDoc(postRef);
    }
  }

  editPost(id: string): void {
    this.router.navigate(['/dashboard/edit-post', id]);
    
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }
}
