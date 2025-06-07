import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

    constructor(private http: HttpClient) {}
   private uploadUrl = environment.cloudinary.cloudinaryUploadUrl;
  private uploadPreset = environment.cloudinary.uploadPreset;



  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post<any>(this.uploadUrl, formData);
  }
}
