

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { CloudinaryService } from '../../../cloudinary.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPost: FormGroup;
  selectedFile: File | null = null;
  uploading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private cloudinaryService: CloudinaryService
  ) {
    this.createPost = fb.group({
      content: ['', [Validators.required]],
      title: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit() {
    if (!this.createPost.valid || !this.selectedFile) {
      console.log('Form is invalid or image not selected');
      return;
    }

    this.uploading = true;

    try {
      // Upload to Cloudinary
      const response = await this.cloudinaryService.uploadImage(this.selectedFile).toPromise();
      const imageUrl = response.secure_url;

      // Save post to Firestore
      const post = {
        title: this.createPost.value.title,
        content: this.createPost.value.content,
        imageUrl: imageUrl,
        datePosted: serverTimestamp()
      };

      await addDoc(collection(this.firestore, 'post'), post);
      console.log('Post uploaded successfully!');
      this.createPost.reset();
      this.selectedFile = null;
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      this.uploading = false;
    }
  }
}
