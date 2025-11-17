import { Component } from '@angular/core';
import { StudentService } from '../student/student.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../student/student.model';

@Component({
  selector: 'app-create-student',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-student.html',
  styleUrl: './create-student.css',
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
  courses: string[] = ['C#', 'Angular 1', 'Angular 2', 'Bootstrap'];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  onCourseChange(course: string, isChecked: boolean) 
  {
    if (isChecked) {
      this.student.courses.push(course);
    } 
    else{
      const index=this.student.courses.indexOf(course);
      if (index> -1) {
        this.student.courses.splice(index, 1);
      }
    }
  }

  onSubmit(formValue: any): void {
    this.studentService.addStudent(
      { name: formValue.name, 
        email: formValue.email , 
        dateOfBirth: formValue.dateOfBirth, 
        gender: formValue.gender, 
        country: formValue.country, 
        courses:this.student.courses
      });

    console.log('Student added:', formValue.name);

    this.router.navigate(['/home']);
  }
}
