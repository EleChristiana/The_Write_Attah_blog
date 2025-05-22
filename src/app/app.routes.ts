import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';

export const routes: Routes = [
    {path: '', component: HomeComponent

    },

    {path: 'about', component: AboutComponent

    },

    {
        path: 'create-post', loadChildren: () => import('./component/dashboard/dashboard.module').then(m=>m.DashboardModule)
    }
];
