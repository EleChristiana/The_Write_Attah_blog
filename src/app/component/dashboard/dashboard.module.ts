import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { SidebarComponent } from '../../reuseable/sidebar/sidebar.component';
import { PostListComponent } from './post-list/post-list.component';

import { StatisticsComponent } from './statistics/statistics.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CreatePostComponent, EditPostComponent, PostListComponent, StatisticsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarComponent,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
     
  
   
   
    

  ]
})
export class DashboardModule { }
