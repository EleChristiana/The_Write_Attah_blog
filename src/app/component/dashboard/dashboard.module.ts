import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { SidebarComponent } from '../../reuseable/sidebar/sidebar.component';


@NgModule({
  declarations: [CreatePostComponent, EditPostComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarComponent

  ]
})
export class DashboardModule { }
