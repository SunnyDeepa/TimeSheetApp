import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'my-task',
    loadChildren: () => import('./pages/my-task/my-task.module').then( m => m.MyTaskPageModule)
  },
  {
    path: 'my-task-form',
    loadChildren: () => import('./pages/my-task-form/my-task-form.module').then( m => m.MyTaskFormPageModule)
  },  
  {
    path: 'my-timesheet-list',
    loadChildren: () => import('./pages/my-timesheet-list/my-timesheet-list.module').then( m => m.MyTimesheetListPageModule)
  },
  {
    path: 'pending-my-review',
    loadChildren: () => import('./pages/pending-my-review/pending-my-review.module').then( m => m.PendingMyReviewPageModule)
  },
  {
    path: 'pending-review-timesheet-form',
    loadChildren: () => import('./pages/pending-review-timesheet-form/pending-review-timesheet-form.module').then( m => m.PendingReviewTimesheetFormPageModule)
  },
  {
    path: 'pending-review-timesheet-view',
    loadChildren: () => import('./pages/pending-review-timesheet-view/pending-review-timesheet-view.module').then( m => m.PendingReviewTimesheetViewPageModule)
  },
  {
    path: 'project-list',
    loadChildren: () => import('./pages/project-list/project-list.module').then( m => m.ProjectListPageModule)
  },
  {
    path: 'my-timesheet-list',
    loadChildren: () => import('./pages/my-timesheet-list/my-timesheet-list.module').then( m => m.MyTimesheetListPageModule)
  },
  {
    path: 'timesheet-view',
    loadChildren: () => import('./pages/timesheet-view/timesheet-view.module').then( m => m.TimesheetViewPageModule)
  },
  {
    path: 'timesheet-form',
    loadChildren: () => import('./pages/timesheet-form/timesheet-form.module').then( m => m.TimesheetFormPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
