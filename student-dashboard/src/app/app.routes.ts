import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateStudentComponent } from './create-student/create-student.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'create-student', component: CreateStudentComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];
