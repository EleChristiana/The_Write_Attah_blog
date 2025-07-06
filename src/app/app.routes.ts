import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { BlogDetailsComponent } from './component/blog-details/blog-details.component';
import { BlogComponent } from './component/blog/blog.component';
import { ContactComponent } from './component/contact/contact.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, 

    },

      { path: 'post/:id', component: BlogDetailsComponent },

    {
        path: 'login', component: LoginComponent
    },

    {path: 'about', component: AboutComponent

    },

 {path: 'blog', component: BlogComponent

    },

    {path: 'contact', component: ContactComponent

    },





    {
    path: 'dashboard',
    loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },


];
