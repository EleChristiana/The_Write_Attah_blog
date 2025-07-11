import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../reuseable/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FooterComponent } from '../../reuseable/footer/footer.component';


interface BlogPost {
    id?: string; 
  title: string;
  content: string;
  imageUrl: string;
  datePosted?: any;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, HeaderComponent, PdfViewerModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  


 
  showPreview: boolean = false;
  pdfDownloadUrl = 'assets/images/Johnattahcv.pdf';
  pdfUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfDownloadUrl);
  }
  ngOnInit(): void {
   
  }

  togglePreview() {
  
 
    this.showPreview = !this.showPreview;
  

  
}


}