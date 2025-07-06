




// import { Injectable } from '@angular/core';
// import { Firestore, collection, collectionData, doc, docData, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

// export interface BlogComment {
//   text: string;
//   userId: string;
//   userName: string;
//   timestamp: any;
// }

// export interface BlogPost {
//   id?: string;
//   title: string;
//   content: string;
//   imageUrl: string;
//   datePosted?: any;
//   comments?: BlogComment[];
//   likes?: number;
//   likedBy?: string[]; // array of userIds who liked the post
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class BlogdetailsService {
//   constructor(private firestore: Firestore) {}

//   getAllPosts(): Observable<BlogPost[]> {
//     const postsCollection = collection(this.firestore, 'post');
//     return collectionData(postsCollection, { idField: 'id' }) as Observable<BlogPost[]>;
//   }

//   getPostById(id: string): Observable<BlogPost> {
//     const postDocRef = doc(this.firestore, `post/${id}`);
//     return docData(postDocRef, { idField: 'id' }) as Observable<BlogPost>;
//   }

//     // ✅ Add this to update likes and likedBy
//   updatePostLikes(postId: string, likes: number, likedBy: string[]): Promise<void> {
//     const postRef = doc(this.firestore, `post/${postId}`);
//     return updateDoc(postRef, { likes, likedBy });
//   }

//   async addComment(postId: string, comment: BlogComment): Promise<void> {
//     const postRef = doc(this.firestore, `post/${postId}`);
//     await updateDoc(postRef, {
//       comments: arrayUnion(comment)
//     });
//   }

//   async updateComments(postId: string, updatedComments: BlogComment[]): Promise<void> {
//     const postRef = doc(this.firestore, `post/${postId}`);
//     await updateDoc(postRef, {
//       comments: updatedComments
//     });
//   }

//   async likePost(postId: string, userId: string): Promise<void> {
//     const postRef = doc(this.firestore, `post/${postId}`);
//     const postSnap = await getDoc(postRef);

//     if (postSnap.exists()) {
//       const postData = postSnap.data() as BlogPost;
//       const likedBy = postData.likedBy || [];

//       if (!likedBy.includes(userId)) {
//         const newLikes = (postData.likes || 0) + 1;
//         const newLikedBy = [...likedBy, userId];

//         await updateDoc(postRef, {
//           likes: newLikes,
//           likedBy: newLikedBy
//         });
//       }
//     }
//   }
// }






import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, updateDoc, arrayUnion, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface BlogComment {
  text: string;
  userId: string;
  userName: string;
  timestamp: any;
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any;
  comments?: BlogComment[];
  likes?: number;
  likedBy?: string[];
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

  updatePostLikes(postId: string, likes: number, likedBy: string[]): Promise<void> {
    const postRef = doc(this.firestore, `post/${postId}`);
    return updateDoc(postRef, { likes, likedBy });
  }

  async addComment(postId: string, comment: BlogComment): Promise<void> {
    const postRef = doc(this.firestore, `post/${postId}`);
    await updateDoc(postRef, {
      comments: arrayUnion(comment)
    });
  }

  async updateComments(postId: string, updatedComments: BlogComment[]): Promise<void> {
    const postRef = doc(this.firestore, `post/${postId}`);
    await updateDoc(postRef, {
      comments: updatedComments
    });
  }

  async likePost(postId: string, userId: string): Promise<void> {
    const postRef = doc(this.firestore, `post/${postId}`);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data() as BlogPost;
      const likedBy = postData.likedBy || [];

      if (!likedBy.includes(userId)) {
        const newLikes = (postData.likes || 0) + 1;
        const newLikedBy = [...likedBy, userId];

        await updateDoc(postRef, {
          likes: newLikes,
          likedBy: newLikedBy
        });
      }
    }
  }
}
