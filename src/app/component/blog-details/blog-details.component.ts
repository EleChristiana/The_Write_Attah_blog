// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { BlogdetailsService, BlogPost } from '../../blogdetails.service';
// import { Timestamp } from '@angular/fire/firestore';
// import { HeaderComponent } from '../../reuseable/header/header.component';

// @Component({
//   selector: 'app-blog-details',
//   standalone: true,
//   imports: [CommonModule, RouterModule, HeaderComponent],
//   templateUrl: './blog-details.component.html',
//   styleUrls: ['./blog-details.component.scss']
// })
// export class BlogDetailsComponent implements OnInit {

//   post?: BlogPost;

//   constructor(
//     private route: ActivatedRoute,
//     private blogService: BlogdetailsService
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.blogService.getPostById(id).subscribe(post => {
//         this.post = post;
//       });
//     }
//   }

//   formatDate(timestamp: any): string {
//       if (!timestamp) return '';
  
//       let date: Date;
  
//       if (timestamp instanceof Timestamp) {
//         date = timestamp.toDate();
//       } else if (timestamp.seconds) {
//         date = new Date(timestamp.seconds * 1000);
//       } else {
//         date = new Date(timestamp);
//       }
  
//       return date.toLocaleString('en-US', {
//         month: 'long',
//         day: 'numeric',
//         year: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//         hour12: true
//       });
//     }
// }







import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogdetailsService, BlogPost, BlogComment } from '../../blogdetails.service';
import { Timestamp } from '@angular/fire/firestore';
import { HeaderComponent } from '../../reuseable/header/header.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { FooterComponent } from '../../reuseable/footer/footer.component';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule, FooterComponent],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
 

  post: BlogPost = {
  id: '',
  title: '',
  content: '',
  imageUrl: '',
  datePosted: null,
  comments: [],
  likes: 0,
  likedBy: []
};

  postId: string = '';
  newComment: string = '';
  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogdetailsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postId = id;
      this.blogService.getPostById(id).subscribe(post => {
        if (post) {
        this.post = {
  ...post,
  comments: post.comments ?? [], 
  likes: post.likes || 0,
  likedBy: post.likedBy || []
};

        }
      });
    }

    effect(() => {
      this.user = this.authService.user();
    });
  }

  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp
      ? timestamp.toDate()
      : new Date(timestamp?.seconds ? timestamp.seconds * 1000 : timestamp);
    return date.toLocaleString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
  }

  likePost(): void {
    if (!this.user) {
      alert('Please log in to like posts.');
      return;
    }

    if (this.post && !this.post.likedBy?.includes(this.user.uid)) {
      this.post.likes! += 1;
      this.post.likedBy!.push(this.user.uid);
      this.blogService.updatePostLikes(this.postId, this.post.likes!, this.post.likedBy!);
    }
  }

  addComment(): void {
    if (!this.newComment.trim() || !this.user) return;

    const comment: BlogComment = {
      text: this.newComment.trim(),
      userId: this.user.uid,
      userName: this.user.displayName || this.user.email,
      timestamp: new Date()
    };

    this.blogService.addComment(this.postId, comment).then(() => {
      this.post?.comments?.push(comment);
      this.newComment = '';
    });
  }

  editComment(comment: BlogComment): void {
    const updatedText = prompt('Edit your comment:', comment.text);
    if (!updatedText?.trim() || updatedText === comment.text || !this.post?.comments) return;

    const index = this.post.comments.findIndex(
      c => c.userId === comment.userId &&
        new Date(c.timestamp).getTime() === new Date(comment.timestamp).getTime()
    );

    if (index !== -1) {
      this.post.comments[index].text = updatedText.trim();
      this.blogService.updateComments(this.postId, this.post.comments);
    }
  }

  sharePost(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Post link copied to clipboard!');
    });
  }

  isOwner(comment: BlogComment): boolean {
    return this.user?.uid === comment.userId;
  }
}
