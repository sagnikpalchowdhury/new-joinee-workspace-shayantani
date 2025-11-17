import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Student } from '../student/student.model';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  students: Student[] = [];

  constructor(private studentService: StudentService){}

  ngOnInit(): void{
    this.students = this.studentService.Students;
  }
}
