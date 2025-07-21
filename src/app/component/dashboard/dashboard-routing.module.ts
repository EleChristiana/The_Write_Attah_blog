import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DasboardComponent } from './dasboard/dasboard.component';

import { PostListComponent } from './post-list/post-list.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
{
    path: '',
    component: DasboardComponent,
    children: [
      { path: 'create-post', component: CreatePostComponent },
      { path: 'edit-post/:id', component: EditPostComponent },
     
      {path:'post-list', component: PostListComponent},
      {path:'statistics', component: StatisticsComponent},
    
      { path: '', redirectTo: 'create-post', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
