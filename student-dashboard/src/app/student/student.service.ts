import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    {id: 100, name: 'Tom', email: 'abc@gmail.com', dateOfBirth: '2000-01-01', gender: 'Male', country: 'India', courses: ['Angular', 'Bootstrap']},
    {id: 101, name:'Jack', email: 'def@gmail.com', dateOfBirth: '2000-02-01', gender: 'Male', country: 'US', courses: ['Angular']}
  ];

  constructor(){}

  get Students(): Student[]{
    return this.students;
  }

  addStudent(newStudent: Omit<Student, 'id'>): void {
    const newId = this.students.length > 0? Math.max(...this.students.map(s=> s.id)) + 1: 100;

    const studenttoAdd: Student = {
      id:newId,
      name: newStudent.name,
      email: newStudent.email,
      dateOfBirth: newStudent.dateOfBirth,
      gender: newStudent.gender,
      country: newStudent.country,
      courses: newStudent.courses
    };

    this.students.push(studenttoAdd);
  }
}
