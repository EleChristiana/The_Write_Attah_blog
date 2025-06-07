import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../reuseable/header/header.component';
import { AuthService } from '../../auth.service';
import { collection, collectionData, Firestore, getDocs } from '@angular/fire/firestore';

interface BlogPost {
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any; // optional timestamp
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {

  cards: BlogPost[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const postsRef = collection(this.firestore, 'posts');

    collectionData(postsRef, { idField: 'id' }).subscribe((data: any) => {
      this.cards = data;
    });
  }

 

  //  cards: any[] = [];

  // constructor(private firestore: Firestore) {}

  // async ngOnInit() {
  //   const postsCollection = collection(this.firestore, 'posts');
  //   const snapshot = await getDocs(postsCollection);

  //   this.cards = snapshot.docs.map(doc => {
  //     const data = doc.data();
  //     return {
  //       title: data['title'],
  //       text: data['content'],
  //       image: data['imageUrl']
  //     };
  //   });
  // }
}


