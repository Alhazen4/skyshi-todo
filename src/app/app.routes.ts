import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivityComponentComponent } from './components/activity-component/activity-component.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent},
    { path: "activity/:id", component: ActivityComponentComponent},
];
