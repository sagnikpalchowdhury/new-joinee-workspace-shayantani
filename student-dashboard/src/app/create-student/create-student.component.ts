import { Component, signal } from '@angular/core';
import { StudentService } from '../student/student.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../student/student.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CourseSelectionComponent } from '../courses/courses.component'; 

@Component({
  selector: 'app-create-student',
  imports: [FormsModule, CommonModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, 
    MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, CourseSelectionComponent],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
})
export class CreateStudentComponent {
 student: Omit<Student, 'id'> = {
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '', 
    country: '',
    courses: []
  };

  countries: string[] = ['India', 'USA', 'Canada', 'UK', 'Australia'];
  
  isCourseSelectionValid: boolean = false;
  isSaving = signal(false);
  
  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  onCoursesChanged(courses: string[]): void {
    this.student.courses = courses
  }
  
  onValidationChanged(isValid: boolean): void {
    this.isCourseSelectionValid = isValid;
  }

  onSubmit(formValue: any): void {
    
    if (!this.isCourseSelectionValid) {
        console.error('Course selection requirements not met.');
        return;
    }
    this.isSaving.set(true);
    
    this.studentService.addStudent(
      { name: formValue.name, 
        email: formValue.email , 
        dateOfBirth: formValue.dateOfBirth, 
        gender: formValue.gender, 
        country: formValue.country,
        courses: this.student.courses
      }
    ).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.isSaving.set(false);
        console.error('Failed to add student:', e);
      }
    });
  }
}