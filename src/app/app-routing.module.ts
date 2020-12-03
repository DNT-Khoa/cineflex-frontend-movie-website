import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/shared/admin-guard.service';
import { UserGuard } from './auth/shared/user-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Using lazy loading to improve performances of the website 
const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canLoad: [UserGuard],
    data: { animation: 'Home'}
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: { animation: 'Auth'}
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard],
    data: { animation: 'Admin'}
  }, 
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: { animation: 'PageNotFound'}
  },
  { 
    path: '**', redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
