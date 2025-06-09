import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  standalone: false,
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit {

   editForm: FormGroup;
  postId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    const postDoc = doc(this.firestore, `post/${this.postId}`);
    const postSnap = await getDoc(postDoc);
    const post = postSnap.data();

    if (post) {
      this.editForm.patchValue({
        title: post['title'],
        content: post['content']
      });
    }
  }

  async onUpdate() {
    const postDoc = doc(this.firestore, `post/${this.postId}`);
    await updateDoc(postDoc, this.editForm.value);
    this.router.navigate(['/posts']);
  }

}
