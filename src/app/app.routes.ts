import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, 

    },

    {
        path: 'login', component: LoginComponent
    },

    {path: 'about', component: AboutComponent

    },




    {
    path: 'dashboard',
    loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  }
];
