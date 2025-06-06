import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit {
  createPost: FormGroup;
  selectedFile: File | undefined;
  ngOnInit(): void {
   
  }

  constructor(private fb: FormBuilder){
    this.createPost = fb.group({
      content: ['', [Validators.required]],
      title:['', [Validators.required]],
      image:['', [Validators.required]]
    })
  }


  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.selectedFile = file;
  }
}

 
 onSubmit(){
  if(this.createPost.valid){
    console.log('posted', this.createPost.value)
  }
  else{
    console.log('try again')
  }
 }
}
