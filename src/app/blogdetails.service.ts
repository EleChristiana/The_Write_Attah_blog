import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BlogdetailsService {
  constructor(private firestore: Firestore) {}

  getAllPosts(): Observable<BlogPost[]> {
    const postsCollection = collection(this.firestore, 'post');
    return collectionData(postsCollection, { idField: 'id' }) as Observable<BlogPost[]>;
  }

  getPostById(id: string): Observable<BlogPost> {
    const postDocRef = doc(this.firestore, `post/${id}`);
    return docData(postDocRef, { idField: 'id' }) as Observable<BlogPost>;
  }
}
